import express from "express"
import { UploadFile, deleteFile, getFiles } from "./Controllers/UploadController.js";
import cors from "cors";
import connectDB from "./Configs/db.js";
const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();


app.use(cors({
    origin: "http://localhost:5173",
    methods: ["POST", "DELETE"],
    credentials: true
}));


app.get("/", (req, res) => {
    res.send("Application Started");
});


app.post("/upload/:file_size", UploadFile);


app.get("/getAllFiles", getFiles)

app.delete("/delete/:public_id", deleteFile);

app.listen(PORT, () => {
    console.log(`Server Running on http://localhost:${PORT}`);
});

