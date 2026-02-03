import React, { useState } from "react";
import { registerUser } from "../Utils/Apis";
import { useNavigate } from "react-router-dom";

function Register() {
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        const payload = {
            name: user.name,
            email: user.email,
            password: user.password
        }

        try {
            const res = await registerUser(payload);
            console.log(res);
            navigate("/login");
        } catch (err) {
            alert(err.response?.data?.message);
            console.log("error message");
            console.log({ error: err });
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-96 bg-[#9a7850] rounded p-4">
                <h2 className="font-bold text-xl text-center mb-3">
                    User Registration
                </h2>

                <form onSubmit={handleSubmit} className="space-y-2">
                    <input
                        name="name"
                        placeholder="Name"
                        value={user.name}
                        onChange={handleChange}
                        className="border w-full p-1"
                    />

                    <input
                        name="email"
                        type="text"
                        placeholder="Email"
                        value={user.email}
                        onChange={handleChange}
                        className="border w-full p-1"
                    />

                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={user.password}
                        onChange={handleChange}
                        className="border w-full p-1"
                    />

                    <button className="bg-black text-white w-full p-2 rounded">
                        Sign Up
                    </button>
                </form>

                <p className="mt-2 text-center">
                    Already Registered?{" "}
                    <a href="/login">
                        <u>Sign in</u>
                    </a>
                </p>
            </div>
        </div>
    );
}

export default Register;
