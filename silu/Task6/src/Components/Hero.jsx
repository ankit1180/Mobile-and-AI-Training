import { useState, useEffect } from "react";
import axios from "axios";

function Hero({ search, user }) {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");
    const [editRow, setEditRow] = useState(null);
    const [editUser, setEditUser] = useState(null);

    useEffect(() => {
        if (user && user.name) {
            console.log('user is : ', user);
            setUsers(prev => [...prev, user]);
            console.log('setUser heated', users);
        }
    }, [user]);

    useEffect(() => {
        localStorage.setItem("Users", JSON.stringify(users));
        console.log('Local storage save');
    }, [users]);


    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get("http://localhost:8080/findall");

                const data = response.data;
                setUsers(data);

                localStorage.setItem("Users", JSON.stringify(data));

                console.log("From localStorage:", JSON.parse(localStorage.getItem("Users")));

            } catch (err) {
                setError("Failed to fetch users");
            }
        };

        fetchUsers();
    }, []);

    // const filteredUsers = JSON.parse(localStorage.getItem('Users')).filter((user) =>
    //     user.name.toLowerCase().includes(search.toLowerCase())
    // );
    const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(search.toLowerCase())
    );

    const handleEdit = (idx, user) => {
        setEditRow(idx);
        setEditUser({
            ...user,
            company: { ...user.company },
            address: { ...user.address }
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        // handle nested fields
        if (name === "company") {
            setEditUser((prev) => ({
                ...prev,
                company: { ...prev.company, name: value }
            }));
        } else if (name === "city") {
            setEditUser((prev) => ({
                ...prev,
                address: { ...prev.address, city: value }
            }));
        } else {
            setEditUser((prev) => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSave = () => {
        const updatedUsers = [...users];
        updatedUsers[editRow] = editUser;
        setUsers(updatedUsers);
        // localStorage.setItem("Users", JSON.stringify(users));
        setEditRow(null);
        setEditUser(null);
    };

    const handleCancel = () => {
        setEditRow(null);
        setEditUser(null);
    };

    const handleDelete = (row) => {
        setUsers((prev) => prev.filter((_, idx) => idx !== row));
        // localStorage.setItem("Users", JSON.stringify(users));
    }


     useEffect(() => {
        localStorage.setItem("Users", JSON.stringify(users));
        console.log('Local storage save');
    }, [users]);

    if (error) return <h1>{error}</h1>;

    return filteredUsers.length === 0 ? (
        <div className="text-center bg-[#E0D2C1] p-2">No Records Found!!</div>
    ) : (
        <div className="flex justify-center p-10">
            <table className="w-full max-w-6xl border border-collapse border-gray-400 bg-[#E0D2C1]">
                <caption className="font-bold text-xl mb-2">User Details</caption>

                <thead className="bg-[#d6c4ae]">
                    <tr>
                        <th className="border px-4 py-2 text-left">Id</th>
                        <th className="border px-4 py-2 text-left">Name</th>
                        <th className="border px-4 py-2 text-left">Username</th>
                        <th className="border px-4 py-2 text-left">Email</th>
                        <th className="border px-4 py-2 text-left">Company</th>
                        <th className="border px-4 py-2 text-left">City</th>
                        <th className="border px-4 py-2 text-left">Website</th>
                        <th className="border px-4 py-2 text-left">Action</th>
                    </tr>
                </thead>

                <tbody>
                    {filteredUsers.map((user, idx) => (
                        <tr
                            key={user.id}
                            className={editRow === idx ? "bg-yellow-100" : ""}
                        >
                            <td className="border px-4 py-2">{user.id}</td>

                            <td className="border px-4 py-2">
                                {editRow === idx ? (
                                    <input
                                        name="name"
                                        value={editUser.name}
                                        onChange={handleChange}
                                        className="border rounded px-2 w-full"
                                    />
                                ) : (
                                    user.name
                                )}
                            </td>

                            <td className="border px-4 py-2">
                                {editRow === idx ? (
                                    <input
                                        name="username"
                                        value={editUser.username}
                                        onChange={handleChange}
                                        className="border rounded px-2 w-full"
                                    />
                                ) : (
                                    user.username
                                )}
                            </td>

                            <td className="border px-4 py-2">
                                {editRow === idx ? (
                                    <input
                                        name="email"
                                        value={editUser.email}
                                        onChange={handleChange}
                                        className="border rounded px-2 w-full"
                                    />
                                ) : (
                                    user.email
                                )}
                            </td>

                            <td className="border px-4 py-2">
                                {editRow === idx ? (
                                    <input
                                        name="company"
                                        value={editUser.company.name}
                                        onChange={handleChange}
                                        className="border rounded px-2 w-full"
                                    />
                                ) : (
                                    user.company.name
                                )}
                            </td>

                            <td className="border px-4 py-2">
                                {editRow === idx ? (
                                    <input
                                        name="city"
                                        value={editUser.address.city}
                                        onChange={handleChange}
                                        className="border rounded px-2 w-full"
                                    />
                                ) : (
                                    user.address.city
                                )}
                            </td>

                            <td className="border px-4 py-2">
                                {editRow === idx ? (
                                    <input
                                        name="website"
                                        value={editUser.website}
                                        onChange={handleChange}
                                        className="border rounded px-2 w-full"
                                    />
                                ) : (
                                    user.website
                                )}
                            </td>

                            <td className="border px-4 py-2 space-x-2">
                                {editRow === idx ? (
                                    <div className="flex">
                                        <button
                                            onClick={handleSave}
                                            className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-700"
                                        >
                                            Save
                                        </button>
                                        <button
                                            onClick={handleCancel}
                                            className="bg-gray-400 text-white px-2 py-1 ml-2 rounded hover:bg-gray-600"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex">
                                        <button
                                            onClick={() => handleEdit(idx, user)}
                                            className="bg-blue-500 text-white px-2 py-1 pl-2 rounded hover:bg-blue-700"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(idx)}
                                            className="bg-blue-500 text-white px-2 py-1  ml-2 rounded hover:bg-blue-700 pl-2"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Hero;
