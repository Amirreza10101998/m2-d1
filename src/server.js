import express from "express";
import cors from "cors";
import listEndpoints from "express-list-endpoints";
import authorsRouter from "./authors/index.js";
import blogsRouter from "./blogs/index.js";
import { notFound, forbidden, catchAllErrorHandler } from "./errorHandlers.js";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

const publicDirectory = path.join(__dirname, "../public");

const server = express();

const PORT = process.env.PORT;

server.use(cors());

server.use(express.json());

server.use(express.static(publicDirectory));

server.use("/authors", authorsRouter);

server.use("/blogs", blogsRouter);

server.use(notFound);

server.use(forbidden);

server.use(catchAllErrorHandler);

console.table(listEndpoints(server));

server.listen(() => console.log("✅ Server is running on PORT :", `${PORT}` ));

server.on("error", (error) =>
  console.log(`❌ Server is not running due to : ${error}`)
);
