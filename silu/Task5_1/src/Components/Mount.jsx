import React from "react";
import { useState, useEffect } from "react";

function Mount(){
    useEffect(()=>{
        console.log('Mounted');
        return (
            console.log('Unmounted')
        );
    },[]);
}

export default Mount;