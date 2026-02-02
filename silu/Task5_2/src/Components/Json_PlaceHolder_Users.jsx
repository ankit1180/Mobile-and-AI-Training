import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

function PlaceHolderUser() {
    const [users, setUsers] = useState([]);
    const [loadingState, setLoadingSet] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoadingSet(true);
                // const response = await fetch("https://jsonplaceholder.typicode.com/users")
            //      if (!response) {
            //         throw new Error('Failled to fetch users!!');
            //     }
            //     const data = await response.json();
            //     setUsers(data);
            //     console.log(data);
            // } catch (error) {
            //     setError(error);
            // } finally {
            //     setLoadingSet(false)
            // }
                const response = await axios.get("https://jsonplaceholder.typicode.com/users");
                if (!response) {
                    throw new Error('Failled to fetch users!!');
                }
                const data = await response.data;
                setUsers(data);
                console.log(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoadingSet(false)
            }
        }
        fetchUsers();
    }, []);

    return (
        error !== "" ? (
            <h1>{error}</h1>
        ) : (
            <div className="flex justify-center">
                <table className="border-separate border-spacing-2 border border-gray-400 dark:border-gray-500 bg-[#E0D2C1] text-black rounded">
                    <caption className="font-bold text-[24px]">User Details</caption>
                    <thead>
                        <tr className="text-center">
                            <th>Id</th>
                            <th>Name</th>
                            <th>User Name</th>
                            <th>Email</th>
                            <th>Company Name</th>
                            <th>Address</th>
                            <th>Website</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id} className="text-center">
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.company?.name}</td>
                                <td>{user.address?.city}</td>
                                <td>{user.website}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    );


}

export default PlaceHolderUser;