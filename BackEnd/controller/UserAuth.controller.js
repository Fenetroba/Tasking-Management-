import userAuthdata from "../model/UserAuth.model.js";
import bcrypt from "bcryptjs";
import env from 'dotenv';
import jwt from 'jsonwebtoken';

env.config();

const SetToken = (UserIds, UserEmail, UserName) => {
    const refreshToken = jwt.sign({ UserIds, UserEmail, UserName }, process.env.REFRASH_SECRET_KEY, {
        expiresIn: '30d'
    });
    const accessToken = jwt.sign({ UserIds, UserEmail, UserName }, process.env.ACSSESS_SECRET_KEY);
    return { refreshToken, accessToken }; // Fixed typo from accsessTocken to accessToken
};

const setCookies = (res, accessToken, refreshToken) => {
    res.cookie("access_Token", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      
    });
    res.cookie("refresh_Token", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
       
    });
};

export const Registration = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check for empty fields
        if (!name || !password || !email) {
            return res.status(400).json({ error: "All fields are required", success: false });
        }

        // Check if the email already exists
        const existEmail = await userAuthdata.findOne({ email });
        if (existEmail) {
            return res.status(400).json({ error: "This email is already in use", success: false });
        }

        if (password.length < 6) {
            return res.status(400).json({ error: "Password must be greater than 6 characters", success: false });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const newUser = await userAuthdata.create({ name, email, password: hashedPassword });

        return res.status(201).json({
            message: "User created successfully",
            success: true,
            id: newUser._id,
            name: newUser.name,
            email: newUser.email,
        });
    } catch (error) {
        console.error("Error in signup controller", error.message);
        return res.status(500).json({ message: error.message });
    }
};

export const Login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userAuthdata.findOne({ email });
        if (!user) {
            return res.status(400).json({ email, error: "User not found", success: false });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (isPasswordValid) {
            const { refreshToken, accessToken } = SetToken(user._id, user.email, user.name);
            user.refreshToken = refreshToken;
            setCookies(res, accessToken, refreshToken);
            return res.status(200).json({ success: true, Username: user.name, Id: user._id, email: user.email ,RefreshToken: user.refreshToken});
        } else {
            return res.status(400).json({ message: "Incorrect password or email", success: false });
        }
    } catch (error) {
        console.error("Error in login controller", error.message);
        return res.status(500).json({ message: error.message });
    }
};

export const logout = async (req, res) => {
    try {
        res.clearCookie("access_Token");
        res.clearCookie("refresh_Token");
        return res.json({ message: "Logged out successfully" });
    } catch (error) {
        console.error("Error in logout controller", error.message);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const checkAuth = async (req, res) => {
    try {
        const accessToken = req.cookies.access_Token;
        if (!accessToken) return res.status(401).json({ isAuthenticated: false });

        jwt.verify(accessToken, process.env.ACSSESS_SECRET_KEY, (err, user) => {
            if (err) return res.status(401).json({ isAuthenticated: false });

            return res.status(200).json({ isAuthenticated: true, user });
        });
    } catch (error) {
        console.error("Check auth error:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
};

