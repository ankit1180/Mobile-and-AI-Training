import { useState, useEffect } from "react";
import {
    getAllUsersApi,
    addUserApi,
    deleteUserApi,
    updateUserApi,
    findByName
} from "../Utils/Apis";

function Hero({ search, user }) {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState("");
    const [editRow, setEditRow] = useState(null);
    const [editUser, setEditUser] = useState(null);

    const [searchedUsers, setSearchedUsers] = useState([]);
    const [searchLoading, setSearchLoading] = useState(false);



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

                const response = await getAllUsersApi();

                const data = response.data;
                console.log('id is:' + data[0]._id);
                setUsers(data);

                localStorage.setItem("Users", JSON.stringify(data));

                console.log("From localStorage:", JSON.parse(localStorage.getItem("Users")));

            } catch (err) {
                setError("Failed to fetch users" + err);
            }
        };

        fetchUsers();
    }, []);



    useEffect(() => {
        const searchUser = async () => {
            if (!search) {
                setSearchedUsers([]);
                return;
            }

            try {
                setSearchLoading(true);
                const res = await findByName(search);
                setSearchedUsers(res.data);
            } catch (err) {
                console.error("Search failed", err);
            } finally {
                setSearchLoading(false);
            }
        };

        searchUser();
    }, [search]);

    const filteredUsers = !search ? users : searchedUsers;

    // filteredUsers = users.filter((user) =>
    //     user.name.toLowerCase().includes(search.toLowerCase())
    // );

    const handleEdit = (idx, user) => {
        setEditRow(idx);
        setEditUser({
            ...user
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;


        setEditUser((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = () => {
        const updatedUsers = [...users];
        updatedUsers[editRow] = editUser;
        setUsers(updatedUsers);
        // call to edit the api
        updateUserApi(editUser._id, editUser);

        console.log(editUser);


        // localStorage.setItem("Users", JSON.stringify(users));
        setEditRow(null);
        setEditUser(null);
    };

    const handleCancel = () => {
        setEditRow(null);
        setEditUser(null);
    };

    const handleDelete = (row) => {
        deleteUserApi(users[row]._id);
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
                        <th className="border px-4 py-2 text-left">Website</th>
                        <th className="border px-4 py-2 text-left">Action</th>
                    </tr>
                </thead>

                <tbody>
                    {filteredUsers.map((user, idx) => (
                        <tr
                            key={user._id}
                            className={editRow === idx ? "bg-yellow-100" : ""}
                        >
                            <td className="border px-4 py-2">{user._id}</td>

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
                                        value={editUser.company}
                                        onChange={handleChange}
                                        className="border rounded px-2 w-full"
                                    />
                                ) : (
                                    user.company
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
