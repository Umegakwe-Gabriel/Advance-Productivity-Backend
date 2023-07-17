import mongoose from "mongoose";

export interface iStep{
    assignedTask?: string;
    assignedAvatar?: string;
    assignedName?: string;
    assignedPriority?: string;
    task?: {};
}

interface iStepData extends iStep, mongoose.Document{}

const stepSchema = new mongoose.Schema(
    {
        assignedTask:{
            type: String,
            require: true,
        },
        assignedName:{
            type: String,
        },
        asssignedPriority:{
            type: String,
        },
        assignedAvatar:{
            type: String
        },

        task:{
            type: mongoose.Types.ObjectId,
            ref: "tasks",
        }
    },
    {timestamps: true}
)

export default mongoose.model<iStepData>("steps", stepSchema)