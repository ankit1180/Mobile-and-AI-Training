import { useState } from "react";

function AddUser({ setAddUser, inclose }) {
    const [user, setUser] = useState({
        id:0,
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

    const handleSubmit = (e) => {
        e.preventDefault();

        setAddUser({
            id: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
            website: user.website,
            company: { name: user.company },
            address: { city: user.address }
        });

        inclose();
    };

    return (
        <div className="flex flex-col justify-center items-center absolute z-10 ml-130">
            <div className="w-96 bg-[#9a7850] rounded p-4">
                <h2 className="font-bold text-xl text-center mb-3">Add User</h2>

                <form onSubmit={handleSubmit} className="space-y-2">
                    <input name="id" placeholder="Id" onChange={handleChange} className="border w-full p-1" />
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
