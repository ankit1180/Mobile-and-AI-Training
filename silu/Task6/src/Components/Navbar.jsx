import { useState } from "react";
import AddUser from "./AddUser";

function Navbar({ setSearch, setAddUser }) {
    const [input, setInput] = useState("");
    const [open, setOpen] = useState(false);

    const searchUser = () => {
        setSearch(input);
        setInput("");
    };

    return (
        <>
            <div className="flex justify-between pl-3 pr-3 bg-[#fafbfc] mt-3 ml-14">
                <div>
                    <input
                        type="search"
                        value={input}
                        className="border h-8 rounded"
                        placeholder="user you want to search"
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <button
                        className="bg-black p-1 ml-2 rounded text-white hover:bg-blue-700"
                        onClick={searchUser}
                    >
                        Search
                    </button>
                </div>

                <button
                    className="bg-black p-1 rounded text-white mr-14 hover:bg-blue-700"
                    onClick={() => setOpen(!open)}
                >
                    + Add
                </button>
            </div>

            {open && <AddUser inclose={() => setOpen(false)} setAddUser={setAddUser}/>}
        </>
    );
}

export default Navbar;
