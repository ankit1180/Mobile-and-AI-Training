import express from "express"
import connectDB from "./Config/db.js"
import userRouter from "./Routes/UserRoutes/UserRoute.js";
import cors from "cors";
import dotenv from "dotenv";
import adminRouter from "./Routes/AdminRoutes/AdminRoute.js";

dotenv.config();

connectDB();

const app = express();
const PORT = 8888;

app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["POST", "PUT", "PATCH", "DELETE", "GET"],
    credentials: true
}));

app.get('/', (req, res) => {
    res.send("Blog Website Started!!");
});

app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter)

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
