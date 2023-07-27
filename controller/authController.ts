import { Request, Response } from "express";
import bcrypt from "bcrypt"
import authModel from "../model/authModel";
import cloudinary from "../config/cloudinary";

    export const createUser = async(req: Request, res: Response) =>{
        try {
            const {userName, email, password, avatar} = req.body;

            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt)

            const {public_id, secure_url} = await cloudinary.uploader.upload(req.file?.path!)

            const user = await authModel.create({userName: req.body.userName, email: req.body.email, password: hash, avatar: secure_url, avatarID: public_id})
            res.status(201).json({message: "user created", data: user})
        } catch (error) {
            res.status(404).json({message: "Error Creating User"})
        }
    }

    export const signinUser = async(req: Request, res: Response)=>{
        try {
            const {email, password} = req.body;

            const getUser = await authModel.findOne({email});

            const hash = await bcrypt.compare(password, getUser?.password!);

            if (getUser) {
                if (hash) {
                    res.status(201).json({message: `Welcome back ${getUser.userName}`, data: getUser._id})
                } else {
                    res.status(404).json({message: "Password is incorrect"})
                }
            } else {
                res.status(404).json({message: "User cannot be found"})
            }
        } catch (error) {
            res.status(404).json({message: "Error creating User"})
        }
    };

    export const readUsers = async(req: Request, res: Response)=>{
        try {
            const user = await authModel.find();

            res.status(200).json({message: "reading users", data: user})
        } catch (error) {
            res.status(404).json({message: "Error Reading Users"})
        }
    };

    export const readOneUser = async(req: Request, res: Response)=>{
        try {
            const {id} = req.params;
        const user = await authModel.findById(id);

        res.status(200).json({message: "reading one user", data: user})
        } catch (error) {
            res.status(404).json({message: "Error Reading one Users"})
        }
    };

    export const updateOneUser = async(req: Request, res: Response)=>{
        try {
            const {id} = req.params;
            const {userName, avatar} = req.body;
            const user = await authModel.findByIdAndUpdate(
                id,
                {userName, avatar},
                {new: true}
            )

            res.status(201).json({message: "updating one user", data: user})
        } catch (error) {
            res.status(404).json({message: "Error Updating one user"})
        }
    };

    export const deleteOneUser = async(req: Request, res: Response)=>{
        try {
            const {id} = req.params;
            const user = await authModel.findByIdAndDelete(id);
            res.status(201).json({message: "deleting one user", data: user})
        } catch (error) {
            res.status(404).json({message: "Error deleting one User"})
        }
    };
