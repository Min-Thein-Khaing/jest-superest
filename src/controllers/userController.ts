import type {Request,Response,NextFunction} from "express";
import { isValidatorEmail } from "../utils/validator.js";
import { UserService } from "../services/userService.js";
export const createUserHandler = async(req:Request,res:Response,next:NextFunction) => {
    const {name,email} = req.body;
    if(!name){
        return res.status(400).json({message:"Name is required"});
    }
    if(!email){
        return res.status(400).json({message:"Email is required"});
    }
    if(!isValidatorEmail(email)){
        return res.status(400).json({message:"Invalid email"});
    }
    
    try {
        const user = await UserService.create(name,email);
        return res.status(201).json({message:"User created successfully",user});
    } catch (error) {
        const message = error instanceof Error ? error.message : "Internal Server Error";
        return res.status(500).json({ error: message });
    }

}