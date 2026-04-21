import express from "express";
import { createUserHandler } from "./controllers/userController.js";



const app = express()
app.use(express.json());


app.post("/users", createUserHandler);

export default app;
