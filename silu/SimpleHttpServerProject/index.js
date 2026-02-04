import express from "express"
import http from "http"
import dotenv from "dotenv"
import User from "./Model/User.Model.js"
import connectDB from "./Config/db.js"
import { initializeLog, logToFile } from "./Config/log.js"
dotenv.config();
const PORT = process.env.PORT;

connectDB();
initializeLog();
const httpServer = http.createServer((req, res) => {
    // if (req.url == "/" && req.method == "GET") {
    //     logToFile(' GET/');
    //     res.writeHead(201).end("hello");
    // } else if (req.url == "/contact-us" && req.method == "GET") {
    //     logToFile(' GET/contact-us');
    //     res.writeHead(200).end("silukumar2003@gmail.com");
    // } else if (req.url === "/tweet" && req.method === "POST") {
    //     logToFile(' POST/tweet');
    //     const addUser = async (req, res) => {
    //         try {
    //             let str = "";

    //             req.on('data', chunk => {
    //                 str += chunk.toString();
    //             });

    //             req.on("end", async () => {
    //                 const data = JSON.parse(str);
    //                 const user = await User.create(data);
    //                 console.log(user);
    //                 res.writeHead(200, { "Content-Type": "text/plain" });
    //                 res.end("User added successfully");
    //             });

    //         } catch (err) {
    //             res.writeHead(400, { "Content-Type": "application/json" });
    //             res.end(JSON.stringify({ error: err.message }));
    //         }
    //     };

    //     addUser(req, res);
    // } else if (req.url === "/tweet" && req.method === "GET") {
    //     logToFile(' GET/tweet');
    //     getAllUser(req, res);
    // } else {
    //     res.writeHead(500, { "Content-Type": "application/json" });
    //     res.end(JSON.stringify({ error: "Method type not allowed" }));
    // }


    const addUser = async (req, res) => {
        try {
            let str = "";

            req.on('data', chunk => {
                str += chunk.toString();
            });

            req.on("end", async () => {

                if (!str) {
                    res.writeHead(400, { "Content-Type": "application/json" });
                    res.end(JSON.stringify({ error: "in POST request body can't be empty!" }));
                }

                try {
                    const data = JSON.parse(str);
                    const user = await User.create(data);
                    console.log(user);
                    res.writeHead(200, { "Content-Type": "text/plain" });
                    res.end("Tweet successfully Posted");
                } catch (err) {
                    res.writeHead(400, { "Content-Type": "application/json" });
                    return res.end(JSON.stringify({ error: err.message }));
                }
            });

        } catch (err) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: err.message }));
        }
    };


    const getAllUser = async (req, res) => {
        try {
            const users = await User.find();

            if (users.length === 0) {
                res.writeHead(404, { "Content-Type": "application/json" });
                return res.end(JSON.stringify({ message: "User List Empty" }));
            }
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ users }));
        } catch (err) {
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: err.message }));
        }
    };

    let method = req.method
    let url = req.url

    switch (method) {
        case "GET":
            switch (url) {

                case "/":
                    logToFile(' GET/');
                    res.writeHead(201).end("hello");
                    return;

                case "/contact-us":
                    logToFile(' GET/contact-us');
                    res.writeHead(200).end("silukumar2003@gmail.com");
                    return;

                case "/tweet":
                    logToFile(' GET/tweet');
                    getAllUser(req, res);
                    return;

                default:
                    res.writeHead(500, { "Content-Type": "application/json" });
                    res.end(JSON.stringify({ error: "Something Went Wrong" }));
            }
            break;


        case "POST":
            switch (url) {

                case "/tweet":
                    logToFile(' POST/tweet');
                    addUser(req, res);
                    return;

                default:
                    res.writeHead(500, { "Content-Type": "application/json" });
                    res.end(JSON.stringify({ error: "Something Went Wrong" }));
            }
            return;

        default:
            res.writeHead(500, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "Something Went Wrong" }));
    }



});




httpServer.listen(PORT, () => {
    console.log(`Server Running on http://localhost:${PORT}`);
});
