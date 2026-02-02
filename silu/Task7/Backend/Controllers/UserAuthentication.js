import express from "express";
import User from "../Models/User.Model.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();




const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
}


export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "please Enter all the fields." });
        }
        const valid_email = email.toLowerCase();
        if (!validateEmail(valid_email)) {
            return res.status(400).json({ message: "please Enter a valid Email." });
        }
        const isUserExist = await User.findOne({ email:valid_email });
        
        if (isUserExist) {
        
            return res.status(409).json({ message: 'User allready exist' });
        }
        
        const salt = await bcrypt.genSalt(10);
        const encryptPwd = await bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            email: valid_email,
            password: encryptPwd,
            refreshToken: null
        });

        console.log('User Registerd Succesfully');
        res.status(200).json(user);
    } catch (err) {
        console.log({ error: err.message })
        return res.status(400).json({ message: err.message });
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "please Enter all the fields." });
        }

        const valid_email = email.toLowerCase();

        if (!validateEmail(valid_email)) {
            return res.status(400).json({ message: "please Enter a valid Email." });
        }

        const user = await User.findOne({ email: valid_email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid Credential' });
        }


        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid Credential' });
        }


        const accessToken = jwt.sign(
            { id: user._id },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "15m" }
        );


        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 15 * 60 * 1000
        });



        const isTokenExpired = (token) => {
            try {
                jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
                return false;
            } catch (err) {
                return true;
            }
        };


        if (!user.refreshToken || isTokenExpired(user.refreshToken)) {
            const newRefreshToken = jwt.sign(
                { userId: user._id },
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: "7d" }
            );
            user.refreshToken = newRefreshToken;
            await user.save();


            res.cookie("refreshToken", user.refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: "strict",
                maxAge: 7 * 24 * 60 * 60 * 1000
            });
        }

        console.log('User Logged Succesfully');
        res.status(200).json({
            message: "Login successful",
            user: {
                name: user.name,
                email: user.valid_email
            }
        });

    } catch (err) {
        console.log({ error: err.message })
        res.status(400).json({ message: err.message });
    }
}



// Register → bcrypt hash → DB
// Login → bcrypt compare → JWT → refresh token saved
