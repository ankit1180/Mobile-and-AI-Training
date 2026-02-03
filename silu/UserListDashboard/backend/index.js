import express from "express";
import cors from "cors";
import { addUser, updateUser, deleteUser, findByName, findAll } from "./Controllers/UserController.js";
import connectDB from "./config/db.js";

const PORT = 8080;
const app = express();



//  CORS MUST COME FIRST
app.use(cors({
  origin: "http://localhost:5173", // Vite
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

// Connect DB 
connectDB();

app.get("/", (req, res) => {
  res.send("Hello Node js this is first program");
});

app.get("/findall", findAll);
app.post("/add", addUser);
app.post("/update/:id", updateUser);
app.delete("/delete/:id", deleteUser);
app.get("/findByName/:name", findByName);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
