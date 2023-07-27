import mongoose from "mongoose"
import { iProgress } from "../utils/interface";

interface iProgressData extends iProgress, mongoose.Document{}

const progressSchema = new mongoose.Schema(
    {
        task:{
            type: String,
            required: true
        },
        name:{
            type: String,
        },
        priority:{
            type: String,
        },
        avatar:{
            type: String,
        },
        step: [
            {
                type: mongoose.Types.ObjectId,
                ref: "steps"
            }
        ]
    }, {timestamps: true}
)

export default mongoose.model<iProgressData>("progress", progressSchema)