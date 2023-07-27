import mongoose from "mongoose";
import { iStep } from "../utils/interface";


interface iStepData extends iStep, mongoose.Document{}

const stepSchema = new mongoose.Schema(
    {
        assignedTask:{
            type: String,
            require: true,
        },
        assignedName:{
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