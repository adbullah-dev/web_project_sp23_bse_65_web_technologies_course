
import express from "express";
const server = express();

server.use(express.static("public"));

// Set view engine to EJS
server.set("view engine", "ejs");

server.get("/", (req, res) => {
    res.render("index");
});

server.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
