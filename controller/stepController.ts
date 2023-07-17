import { Request, Response } from "express";
import mongoose from "mongoose";
import authModel from "../model/authModel";
import taskModel from "../model/taskModel";
import stepModel from "../model/stepModel";

export const createStep = async(req: Request, res: Response)=>{
    try {
        const {id} = req.params;
        const {assignedName, assignedTask, assignedPriority} = req.body;

        const auth = await authModel.findOne({userName: assignedName});

        const task: any = await taskModel.findById(id);

        if (auth) {
            const step = await stepModel.create({
                assignedTask, assignedName: auth?.userName,
                assignedAvatar: auth?.avatar,
                assignedPriority,
            });

            task!.step.push(new mongoose.Types.ObjectId(step?._id));

            task!.save();

            res.status(201).json({message: "task created", data: step})
        } else {
            res.status(404).json({message: "Error assigning user"})
        }
    } catch (error) {
        res.status(404).json({message: "Error Creating Task"});
    }
};

export const readTask = async(req: Request, res: Response)=>{
    try {
        const tasked = await taskModel.find();

        res.status(200).json({message: "task read", data: tasked})
    } catch (error) {
        res.status(404).json({message: "Error reading Task"})
    }
}

export const readSteps = async(req: Request, res: Response)=>{
    try {
        const {id} = req.params;
        const tasked = await taskModel.findById(id).populate({
            path: "step",
            options:{
                sort:{createdAt: -1}
            },
        });

        res.status(200).json({message:"task step read", data: tasked})
    } catch (error) {
        res.status(404).json({message: "Error reading task"})
    }
}

export const readOneStep = async(req: Request, res: Response)=>{
    try {
        const {id} = req.params;
        const tasked = await stepModel.findById(id);

        res.status(200).json({message: "task step read", data: tasked})
    } catch (error) {
        res.status(404).json({message: "Error reading task"})
    }
};

export const updateOneStep = async(req: Request, res: Response)=>{
    try {
        const {id} = req.params;
        const {assignedTask} = req.body;
        const tasked = await stepModel.findByIdAndUpdate(
            id,
            {assignedTask},
            {new: true},
        );

        res.status(200).json({message: "task step read", data: tasked})
    } catch (error) {
        res.status(404).json({message: "Error reading task"})
    }
};

export const deleteStep = async(req: Request, res: Response)=>{
    try {
        const {stepID, taskID} = req.params;

        const tasked: any = await taskModel.findById(taskID);

        const stepped = await stepModel.findByIdAndDelete(stepID);

        tasked!.step.pull(new mongoose.Types.ObjectId(stepped?._id));

        tasked.save();

        res.status(200).json({message: "step deleted"})
    } catch (error) {
        res.status(404).json({message: "Error deleting step"})
    }
};