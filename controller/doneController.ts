import {Request, Response} from "express"
import bcrypt from "bcrypt"
import mongoose from "mongoose"
import doneModel from "../model/doneModel"
import progressModel from "../model/progressModel"
import stepModel from "../model/stepModel"

export const doneCreateUser = async(req: Request, res: Response) =>{
    try {
        const user = await doneModel.create(req.body)
        res.status(201).json({
            message: "done created", data: user
        })
    } catch (error) {
        res.status(404).json({
            message: "error creating user",
        })
    }
}

export const readDoneUsers = async(req: Request, res: Response) =>{
    try {
        const user = await doneModel.find();
        res.status(200).json({message: "reading done users", data: user})
    } catch (error) {
        res.status(200).json({message: " error reading done users"})
    }
}

export const readOneDoneUser = async(req: Request, res: Response)=>{
    try {
        const {id} = req.params;
        const user = await doneModel.findById(id)
        res.status(200).json({
            messsage: "reading one done users", data: user
        })
    } catch (error) {
        res.status(400).json({
            messsage: "error reading one done users"
        })
    }
}

export const deleteProgressStep = async(req: Request, res: Response)=>{
    try {
        const {progressId, progressStepId} = req.params;
        const progress: any = await progressModel.findById(progressId)

        const removeStep = await stepModel.findById(progressStepId)

        const anything: any = await progress?.step?.pull(new mongoose.Types.ObjectId(removeStep!._id),)

        res.status(201).json({message: "removing progress step", data: anything})
    } catch (error) {
        res.status(404).json({message: " failed to remove progress step"})
    }
}