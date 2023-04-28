require("dotenv").config();
const ip = require("ip");
const cors = require("cors");
const http = require("http");
const express = require("express");
const createError = require("http-errors");
const cookieParser = require("cookie-parser");
const jsonResponse = require("./utils/jsonResponse");
const RouteInitializer = require("./routes/index");

const app = express();
const port = normalizePort(process.env.PORT || 3000);
const debug = require("debug")("server");
const swaggerAutogen = require("swagger-autogen");
var corsOptions = {
    origin: "*",
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
const doc = {
    info: { title: "Student portal api document", description: "Description" },
    host: process.env.HOST + ":" + process.env.PORT,
    schemes: ["http"],
};

const outputFile = "./utils/swagger_output.json";
const endpointsFiles = ["./routes/index"];
swaggerAutogen(outputFile, endpointsFiles, doc);
RouteInitializer(app);

app.use(function (req, res, next) {
    return next(createError(404));
});

app.use(function (error, req, res, next) {
    console.log(error);
    res.locals.message = error.message;
    res.locals.error = req.app.get("env") === "development" ? error : {};
    return jsonResponse({ req, res })
        .status(error.status || 500)
        .json({ message: error.message || "Internal Server Error", errors: error });
});

app.set("port", port);

const server = http.createServer(app);

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

function normalizePort(val) {
    const port = parseInt(val, 10);
    if (isNaN(port)) return val;
    if (port >= 0) return port;
    return false;
}

function onError(error) {
    if (error.syscall !== "listen") throw error;
    const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;
    switch (error.code) {
        case "EACCES":
            console.log(bind + " requires elevated privileges");
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.log(bind + " is already in use");
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function onListening() {
    const addr = server.address();
    const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
    console.log("Local address: " + "http://localhost:" + port);
    console.log("Network address: " + "http://" + ip.address() + ":" + port);
    debug("Listening on " + bind);
}
