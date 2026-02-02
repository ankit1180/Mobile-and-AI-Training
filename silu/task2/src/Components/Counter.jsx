import React from "react";
import { useState } from "react";


function Counter(){
    const[count, setCount] = useState(0);
    return (
        <div className="h-100 flex flex-col justify-center items-center">
            <div class="h-50 w-80 bg-indigo-500  text-center  text-white rounded">
                <h1 className="pt-5 text-[24px]">Counter App</h1>
                <h1 className="pt-5  pt-5 text-[24px]">{count}</h1>
                <div className="flex gap-4 flex justify-center pt-5">
                    <button onClick={()=>count >= 20 ? alert('Counter Value never be Greater than 20.'): setCount(prev=>prev + 1)}   class="bg-blue-500 p-2 hover:bg-fuchsia-500 rounded" >Increment</button>
                    <button onClick={()=>count <= 0 ? alert('Counter Value never be Lesser than 0.'): setCount(prev=>prev - 1)}   class="bg-blue-500 p-2 hover:bg-fuchsia-500 rounded" >Decrement</button>
                    <button onClick={()=>setCount(prev=>0)} class="bg-blue-500 pl-6 pr-6 hover:bg-fuchsia-500 rounded">Set</button>
                </div>
            </div>
        </div>
       
    )
}
export default Counter;



















