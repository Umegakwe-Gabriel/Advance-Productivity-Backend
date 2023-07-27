import mongoose from "mongoose";
import { iTask } from "../utils/interface";



interface iTaskData extends iTask, mongoose.Document{}

const taskSchema = new mongoose.Schema(
    {
        task: {
            type: String,
            require: true,
        },
        name:{
            type: String,
        },
        priority:{
            type: String,
        },
        avatar:{
            type: String
        },

        step:[
            {
                type: mongoose.Types.ObjectId,
                ref: "steps"
            }
        ]
    }, 
    {timestamps: true}
)

export default mongoose.model<iTaskData>("tasks", taskSchema)