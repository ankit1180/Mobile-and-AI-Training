import React from 'react';

function Header(){
    return(
        <div className='flex flex-col justify-center items-center'>
            <h1 className="text-[30px] font-bold text-[#2e4459]">User Management</h1>
            <h3 className='font-bold text-[394c61]'>Mange all users in one place, controll acess, asign roles and moniter activity of actions across your platform</h3>
        </div>
    );
}

export default Header;