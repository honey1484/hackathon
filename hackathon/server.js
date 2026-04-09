const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const path = require('path');

const app = express();
const PORT = 3000;

// ── Middleware ──────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'frontend')));
app.use(session({
  secret: 'netscope-ai-secret-key-2026',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 24 * 60 * 60 * 1000 } // 24 hours
}));

// ── MongoDB Connection ─────────────────────────────────
mongoose.connect('mongodb://localhost:27017/netscopeai')
  .then(() => console.log('✅ Connected to MongoDB (netscopeai)'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// ── User Schema ────────────────────────────────────────
const userSchema = new mongoose.Schema({
  name:      { type: String, required: true, trim: true },
  email:     { type: String, required: true, unique: true, lowercase: true, trim: true },
  password:  { type: String, required: true, minlength: 6 },
  role:      { type: String, default: 'Security Analyst' },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

// ── Auth Middleware ────────────────────────────────────
function requireAuth(req, res, next) {
  if (req.session && req.session.userId) {
    return next();
  }
  return res.status(401).json({ success: false, message: 'Not authenticated' });
}

// ── ROUTES ─────────────────────────────────────────────

// Sign Up
app.post('/api/signup', async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    // Validation
    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }
    if (password.length < 6) {
      return res.status(400).json({ success: false, message: 'Password must be at least 6 characters' });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ success: false, message: 'Passwords do not match' });
    }

    // Check if user already exists
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ success: false, message: 'An account with this email already exists' });
    }

    // Hash password & save
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    // Set session
    req.session.userId = user._id;
    req.session.userName = user.name;
    req.session.userEmail = user.email;
    req.session.userRole = user.role;

    console.log(`✅ New user registered: ${email}`);
    res.json({ success: true, message: 'Account created successfully', user: { name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ success: false, message: 'Server error. Please try again.' });
  }
});

// Login
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid email or password' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid email or password' });
    }

    // Set session
    req.session.userId = user._id;
    req.session.userName = user.name;
    req.session.userEmail = user.email;
    req.session.userRole = user.role;

    console.log(`✅ User logged in: ${email}`);
    res.json({ success: true, message: 'Login successful', user: { name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ success: false, message: 'Server error. Please try again.' });
  }
});

// Logout
app.post('/api/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) return res.status(500).json({ success: false, message: 'Logout failed' });
    res.json({ success: true, message: 'Logged out successfully' });
  });
});

// Get current user (check session)
app.get('/api/me', requireAuth, async (req, res) => {
  try {
    const user = await User.findById(req.session.userId).select('-password');
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    res.json({ success: true, user: { name: user.name, email: user.email, role: user.role, joined: user.createdAt } });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Change password
app.post('/api/change-password', requireAuth, async (req, res) => {
  try {
    const { currentPassword, newPassword, confirmNewPassword } = req.body;

    if (!currentPassword || !newPassword || !confirmNewPassword) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }
    if (newPassword.length < 6) {
      return res.status(400).json({ success: false, message: 'New password must be at least 6 characters' });
    }
    if (newPassword !== confirmNewPassword) {
      return res.status(400).json({ success: false, message: 'New passwords do not match' });
    }

    const user = await User.findById(req.session.userId);
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Current password is incorrect' });
    }

    user.password = await bcrypt.hash(newPassword, 12);
    await user.save();

    console.log(`✅ Password changed for: ${user.email}`);
    res.json({ success: true, message: 'Password updated successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Serve index.html for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

// ── Start Server ───────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀 NetScope AI server running at http://localhost:${PORT}`);
  console.log(`📁 Serving static files from /frontend`);
  console.log(`🗄️  MongoDB: mongodb://localhost:27017/netscopeai\n`);
});
