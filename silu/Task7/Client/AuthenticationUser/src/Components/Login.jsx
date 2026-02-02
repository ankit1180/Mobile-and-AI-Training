import React from "react";
import { useState } from "react";
import { registerUser } from "../Utils/Apis";
import { loginUser } from "../Utils/Apis";
import { useNavigate } from "react-router-dom";
function Login() {
    const [user, setUser] = useState({
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            email: user.email,
            password: user.password
        }
        try {
            const res = await loginUser(payload);
            console.log(res);
            navigate("/home", {
                state: { name: res.data.user.name }
            });
        } catch (err) {
             alert(err.response?.data?.message);
            console.log({ error: err });
        }
    };


    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-96 bg-[#9a7850] rounded p-4">
                <h2 className="font-bold text-xl text-center mb-3">
                    User Sign in
                </h2>

                <form className="space-y-2" onSubmit={handleSubmit}>
                    <input
                        name="email"
                        type="text"
                        placeholder="Email"
                        className="border w-full p-1"
                        onChange={handleChange}
                    />

                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        className="border w-full p-1"
                        onChange={handleChange}
                    />

                    <button className="bg-black text-white w-full p-2 rounded">
                        Sign in
                    </button>
                </form>

                <p className="mt-2 text-center">
                    Not Registered?{" "}
                    <a href="/">
                        <u>Sign Up</u>
                    </a>
                </p>
            </div>
        </div>
    );
}

export default Login;
