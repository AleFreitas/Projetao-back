import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();


const server = express();
server.use(express.json());
server.use(cors());
//ROUTES

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`Server running in port: ${port}`));