import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

// User Registration
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, academicLevel, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ error: "All fields are required." });
    }

    if (role === 'student' && (!academicLevel || isNaN(academicLevel))) {
      return res.status(400).json({ error: "Academic level is required for students and must be a number." });
    }

    if (role === 'admin' && academicLevel) {
      return res.status(400).json({ error: "Admins should not have an academic level." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      academicLevel: role === 'admin' ? null : Number(academicLevel),
      role
    });

    await newUser.save();
    return res.status(201).json({ message: 'User registered successfully! Please check your email to verify your account.' });
  } catch (error) {
    return res.status(500).json({ error: 'Server error' });
  }
};

// User Login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid email or password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid email or password' });

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });

    res.cookie('authToken', token, { httpOnly: true, secure: false });

    return res.json({
      message: 'Login successful!',
      user: { id: user._id, name: user.name, email: user.email, role: user.role, academicLevel: user.academicLevel },
      token
    });
  } catch (error) {
    return res.status(500).json({ error: 'Server error' });
  }
};

//  User Logouts
export const logoutUser = (req, res) => {
  res.clearCookie('authToken');
  return res.json({ message: 'Logged out successfully' });
};

//  Get Current Users
export const getCurrentUser = async (req, res) => {
  try {
    const token = req.cookies.authToken;
    if (!token) return res.status(401).json({ error: 'Not authenticated' });

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    if (!user) return res.status(404).json({ error: 'User not found' });

    return res.json(user);
  } catch (error) {
    return res.status(500).json({ error: 'Server error' });
  }
};

//loginbnmm