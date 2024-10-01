import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
export const register = async (req, res) => {
	try {
		const { name, email, phoneNumber, password, role } = req.body;
		if (!name || !email || !phoneNumber || !password || !role) {
			return res.status(400).json({ message: "All fields are required" });
		}
		const user = await User.findOne({ email });
		if (user) {
			return res.status(400).json({ message: "Email already exists" });
		}
		const hashedPassword = await bcrypt.hash(password, 10);
		const newUser = new User({
			name,
			email,
			phone: phoneNumber,
			password: hashedPassword,
			role: role,
		});
		await newUser.save();
		res.status(201).json({ message: "User registered successfully" });
		return;
	} catch (error) {
		console.error(error.message);
		res.status(500).json({ message: "Server error" });
	}
};

export const Login = async (req, res) => {
	try {
		const { email, password, role } = req.body;
		if (!email || !password || !role) {
			return res.status(400).json({ message: "All fields are required" });
		}
		let user = await User.findOne({ email });
		if (!user) {
			return res.status(401).json({ message: "Invalid credentials" });
		}
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(401).json({ message: "Invalid credentials" });
		}
		if (role !== user.role) {
			return res.status(403).json({ message: "Unauthorized access" });
		}
		const token = await jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
			expiresIn: "1d",
		});
		user = {
			_id: user._id,
			name: user.name,
			email: user.email,
			role: user.role,
			phoneNumber: user.phone,
			profile: user.profile,
		};
		res
			.status(200)
			.cookie("token", token, {
				maxAge: 1 * 24 * 60 * 60 * 1000,
				httpOnly: true,
				sameSite: "strict",
			})
			.json({ message: "Login successful", success: true, user });
		return;
	} catch (error) {
		console.error(error.message);
		res.status(500).json({ message: "Server error" });
	}
};

export const Logout = async (req, res) => {
	try {
		res
			.status(200)
			.clearCookie("token", { path: "/", maxAge: 0 })
			.json({ message: "Logged out successfully" });
		return;
	} catch (error) {
		console.error(error.message);
		res.status(500).json({ message: "Server error" });
	}
};

export const updateProfile = async (req, res) => {
	try {
		const  userId  = req.id;
		const data = req.body;
		const file = req.file;
		if (!userId) {
			return res.status(401).json({ message: "Unauthorized accessaa" });
		}
		const updatedUser = await User.findByIdAndUpdate(
			userId,
			{
				...data,
			},
			{ new: true }
		);
		if (!updatedUser) {
			return res.status(404).json({ message: "User not found" });
		}
		res.json({ message: "Profile updated successfully" });
		return;
	} catch (error) {
		console.error(error.message);
		res.status(500).json({ message: "Server error" });
	}
};
