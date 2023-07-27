import express,{ Application, Request, Response } from "express";
import cors from "cors"
import auth from "./router/authRouter"
import task from "./router/taskRouter"
import step from "./router/stepRouter"
import progress from "./router/progressRouter"
import done from "./router/doneRouter"

export const mainApp = (app: Application)=>{
    app
    .use(cors())
    .use(express.json())
    .use("/api/v1/auth", auth)
    .use("/api/v1/task", task)
    .use("/api/v1/step", step)
    .use("/api/v1/progress", progress)
    .use("/api/v1/done", done)

    .get("/", (req: Request, res: Response)=>{
        try {
            return res.status(200).json({message: "Awesome and good to GO!!!!!"})
        } catch (error) {
            return res.status(404).json({message: "Error found"})
        }
    })
}