import React from "react";
import { useState } from "react";

function Show(){
    const [show, setShow] = useState(false);
    return (
        <div className="flex flex-col justify-center items-center h-100">
            <div className="w-100 word-break text-center bg-indigo-500 text-white m-2 border rounded p-2">
                <button onClick={()=>setShow(show => !show)} className="text-center border rounded pl-3 pr-3 bg-red-800">{show ? "Hide" : "Show"}</button>
                {show && <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis dolores asperiores quos, id molestiae aliquid excepturi quo laudantium quod ea pariatur atque ullam placeat porro voluptates vero autem repudiandae voluptatem repellat! Cum ab excepturi reprehenderit eos quisquam quasi praesentium sit?</p>}
            </div>
        </div>
    )
}

export default Show;