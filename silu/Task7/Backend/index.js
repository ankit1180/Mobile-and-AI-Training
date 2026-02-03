import express from "express";
import connectDB from "./Config/db.js";
import cors from "cors";
import { loginUser, registerUser } from "./Controllers/UserAuthentication.js";


const PORT = 8080;
const app = express();
app.use(express.json());



app.use(cors({
  origin: "http://localhost:5173",
  methods: ["POST"],
  credentials: true
}));


connectDB();

app.get('/', (req, res)=>{
    res.send("Authentication app started!!");
});

app.post("/register",registerUser);
app.post("/login", loginUser);
app.listen(PORT, ()=>{
    console.log(`Server running on http://localhost:${PORT}`);
});
