import mongoose from "mongoose";

const connectDB = async ()=>{
    try{
        await mongoose.connect("mongodb://localhost:27017/fileuploader");
        console.log("DB Conntection Successful!!");
    }catch(error){
        console.log('Erro during db connection : '+ error.message);
        process.exit(1);
    }
};

export default connectDB;