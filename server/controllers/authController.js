import dotenv from 'dotenv';
dotenv.config();

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const JWT_SECRET = process.env.JWT_SECRET;

// Register
export const registerUser = async (req, res) => {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
        return res.status(400).json({ message: "All fields are required." });
    }

    try {
        const existing = await User.findOne({ email });
        if (existing) return res.status(400).json({ message: "Email already exists." });

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            role,
        });

        res.status(201).json({ message: "User registered successfully." });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// Login
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            console.log("User not found");
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log("Password mismatch");
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { userId: user._id, role: user.role, name: user.name },
            JWT_SECRET,
            { expiresIn: '1d' }
        );

        console.log("Login successful:", user.email);
        res.status(200).json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            }
        });
    } catch (err) {
        console.error("Login error:", err.message);
        res.status(500).json({ message: "Login error", error: err.message });
        console.log("JWT_SECRET in use:", JWT_SECRET); // REMOVE after test

    }
};
