import { Role } from "../Enums/Roles.Enums.js";
import User from "../Model/User.Model.js";
import bcrypt, { genSalt } from "bcrypt"
import jwt from "jsonwebtoken";

const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
}

const validateRole = (req) => {
    if (req.body.role.toLowerCase() === "user") {
        req.body.role = Role.USER;
    } else if (req.body.role.toLowerCase() === "admin") {
        req.body.role = Role.ADMIN;
    } else {
        throw new Error("Invalid Role Type ?? Role Must be Admin || User");
    }
}

export const UserRegister = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json({ error: "User Not Found" });
        }

        const { name, email, password, role } = req.body;
        if (
            !name || name.trim().length === 0 ||
            !email || email.trim().length === 0 ||
            !password || password.trim().length === 0 ||
            !role || role.trim().length === 0
        ) {
            return res.status(400).json({ error: "Please Enter all the fields!!" });
        }

        const valid_email = email.toLowerCase();
        if (!validateEmail(valid_email)) {
            return res.status(400).json({ error: "Invalid Email!!" });
        }

        validateRole(req);

        const isUserExist = await User.findOne({ "email": valid_email })
        if (isUserExist) {
            console.log("user is : ", isUserExist);
            return res.status(409).json({ error: "User Already Exist!!" });
        }

        const salt = await genSalt(10);
        const encryptedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            email: valid_email,
            password: encryptedPassword,
            role: req.body.role,
            refreshToken: null
        });
        return res.status(201).json({ message: "User Registered Successfully!!!", data: user });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

export const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || email.trim().length === 0
            || !password || password.trim().length === 0) {
            return res.status(400).json({ message: "Please enter all fields" });
        }

        const validEmail = email.toLowerCase();

        if (!validateEmail(validEmail)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        const user = await User.findOne({ email: validEmail });
        if (!user) {
            return res.status(401).json({ message: "User Not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid User Id or Password!!" });
        }

        const accessToken = jwt.sign(
            { id: user._id },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: process.env.ACCESS_TOKEN_EXPIRES }
        );


        const refreshToken = jwt.sign(
            { id: user._id },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: process.env.REFRESH_TOKEN_EXPIRES }
        );

        user.refreshToken = refreshToken;
        await user.save();

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: Number(process.env.ACCESS_TOKEN_MAX_AGE)
        });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,     //Prevents JavaScript from accessing the cookie
            secure: true,//.Cookie is sent only over HTTPS.
            sameSite: "none",   //Controls whether the browser sends the cookie on cross-site requests.(Cookie sent ONLY if request comes from same site.)
            maxAge: Number(process.env.REFRESH_TOKEN_MAX_AGE)
        });

        res.status(200).json({
            message: "Login successful",
            data: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};
