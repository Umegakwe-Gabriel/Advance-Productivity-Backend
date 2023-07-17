import mongoose from "mongoose";

export interface iTask {
    task?: string;
    avatar?: string;
    name?: string;
    priority?: string;
    step?: {}[];
}

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