import React from "react";
import { useLocation } from "react-router-dom";

function Home() {

    const location = useLocation();
    const { name } = location.state || {};

    return (
        <div className="h-40 flex text-center justify-center mt-40 bg-[#9a7850] rounded">
            <h1>Welocme {name}</h1>
        </div>
    )
}

export default Home;