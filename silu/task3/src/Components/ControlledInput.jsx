import React from "react";
import { useState } from "react";
function ControlledInput(){
    const[text, setText] = useState("");
    return (
        <div className="h-100 flex justify-center items-center">
            <div className="w-80 bg-indigo-500 text-center break-words rounded text-white">
                <label for="text">Enter Any Thing</label><br/>
                <input type="text" name="" id="text" onChange={(e)=>
                    setText(text =>e.target.value)} className="border mt-2 rounded"/>
                {<p className="mt-2">Text : {text}</p>}
            </div>
        </div>
        
    )
}
export default ControlledInput;