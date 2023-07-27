import progressModel from "../model/progressModel"
import { Request, Response } from "express"

export const createProgress = async(req: Request, res: Response)=>{
    try {
        const tasked = await progressModel.create(req.body)

        res.status(201).json({message: "task created", done: tasked})
    } catch (error) {
        res.status(201).json({message: "task created"})
    }
}

export const readProgress = async(req: Request, res: Response) =>{
    try {
        const tasked = await progressModel.find();

        res.status(200).json({message: "task read", data: tasked})
    } catch (error) {
        res.status(404).json({message: "Error reading task"})
    }
}

export const readProgressDetail = async(req: Request, res: Response) =>{
    try {
        const {id} = req.params;
        const tasked = await progressModel.findById(id).populate({path: "step", options: {
            sort: {createdAt: -1},
        }});

        res.status(200).json({message: "task read", data: tasked})
    } catch (error) {
        res.status(404).json({message: "error reading task"})
    }
}

export const deleteProgress = async(req: Request, res: Response)=>{
    try {
        const {id} = req.params;
        const tasked = await progressModel.findByIdAndDelete(id);

        res.status(200).json({message: "tasked deleted", data: tasked})
    } catch (error) {
        res.status(404).json({message: "tasked deleted"})
    }
}