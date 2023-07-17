import { Request, Response } from "express";
import taskModel from "../model/taskModel";
import authModel from "../model/authModel";

export const createTask = async(req: Request, res: Response) =>{
    try {
        const {id} = req.params;
        const {task, priority} = req.body;

        const user = await authModel.findById(id);
        
        const tasked = await taskModel.create({
            name: user?.userName,
            task, 
            priority,
            avatar: user?.avatar
        });

        res.status(201).json({message: "task created", data: tasked})
    } catch (error) {
        res.status(404).json({message: "Error creating task"})
    }
}

export const readTask = async(req: Request, res: Response)=>{
    try {
        const tasked = await taskModel.find();

        res.status(200).json({message: "task read", data: tasked})
    } catch (error) {
        res.status(404).json({message: "Error reading task"})
    }
}

export const deleteTask = async(req: Request, res: Response)=>{
    try {
        const {id} = req.params;
        const tasked = await taskModel.findByIdAndDelete(id)

        res.status(200).json({message: "Task deleted", data: tasked})
    } catch (error) {
        res.status(404).json({message: "Error deleting Task"});
    }
}