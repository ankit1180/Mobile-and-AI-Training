import User from '../models/user.model.js'

const addUser = ((req)=>{
    try{
        const user = User.create(req);
        console.log(user);
        return user;
    }catch(error){
        throw new Error(error);
    }
})