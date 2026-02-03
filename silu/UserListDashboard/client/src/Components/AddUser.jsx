import { useState } from "react";
import { addUserApi } from "../Utils/Apis";

function AddUser({ setAddUser, inclose }) {
    const [user, setUser] = useState({
        id: 0,
        name: "",
        username: "",
        email: "",
        address: "",
        company: "",
        website: ""
    });

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
            name: user.name,
            username: user.username,
            email: user.email,
            website: user.website,
            company: user.company,
            address: user.address
        };

        try {
            const res = await addUserApi(payload);

            // update UI immediately (from payload or API response)
            setAddUser(res.data);

            inclose();
        } catch (err) {
            console.error("Error adding user:", err);
            alert("Failed to add user");
        }
    };


    return (
        <div className="flex flex-col justify-center items-center absolute z-10 ml-130">
            <div className="w-96 bg-[#9a7850] rounded p-4">
                <h2 className="font-bold text-xl text-center mb-3">Add User</h2>

                <form onSubmit={handleSubmit} className="space-y-2">
                    <input name="name" placeholder="Name" onChange={handleChange} className="border w-full p-1" />
                    <input name="username" placeholder="Username" onChange={handleChange} className="border w-full p-1" />
                    <input name="email" placeholder="Email" onChange={handleChange} className="border w-full p-1" />
                    <input name="address" placeholder="City" onChange={handleChange} className="border w-full p-1" />
                    <input name="company" placeholder="Company" onChange={handleChange} className="border w-full p-1" />
                    <input name="website" placeholder="Website" onChange={handleChange} className="border w-full p-1" />

                    <button className="bg-black text-white w-full p-2 rounded">
                        Save
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddUser;
