import mongoose from "mongoose"
import { iDone } from "../utils/interface";

interface iDoneData extends iDone, mongoose.Document{}

const doneSchema = new mongoose.Schema(
    {
        assignedName:{
            type: String,
        },
        assignedTask: {
            type: String,
        },
        assignedPriority:{
            type: String,
        },
        assignedAvatar:{
            type: String
        }
    }, {timestamps: true}
)

export default mongoose.model<iDoneData>("dones", doneSchema)
