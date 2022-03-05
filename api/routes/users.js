import express from "express";
import User from "../models/User.js";
import CryptoJS from "crypto-js";
import verify from "../verifyToken.js";

const userRouter = express.Router();

//Update
userRouter.put(
    "/:id",
    verify,
    async(req,res)=>{
        if(req.user.id === req.params.id || req.params.isAdmin){
            if(req.body.password){
               req.body.password = CryptoJS.AES.encrypt(
                   req.body.password,
                   process.env.SECRET_KEY
               ).toString(); 
            }
            try{
                const updatedUser = await User.findByIdAndUpdate(
                    req.params.id,
                    {$set:req.body},
                    {new:true}
                    );
                    res.status(200).json(updatedUser);
            }
            catch(err){
                res.status(500).json(err);
            }
        }
        else{
            res.status(403).json("You can update only account");
        }
    }
)

//Delete

userRouter.delete(
    "/:id",
    verify,
    async(req,res)=>{
        if(req.user.id === req.params.id || req.user.isAdmin){
            try{
                await User.findByIdAndDelete(req.params.id);
                res.status(200).json("User has been deleted.....");
            }
            catch(err){
                res.status(500).send(err);
            }
        }
        else{
            res.status(403).json("You can delete only your account!...");
        }
    }
)

//Get A User
userRouter.get(
    "/find/:id",
    async(req,res)=>{
        try{
            const user = await User.findById(req.params.id);
            const {password, ...info} = user._doc;
            res.status(200).json(info);
        }
        catch(err){
            res.status(500).json(err);
        }
    }
)

//Get all Users
userRouter.get(
    "/",
    verify,
    async(req,res)=>{
        const query = req.query.new;
        if(req.user.isAdmin){
            try{
                const users = query ? await User.find().limit(10) 
                : await User.find();
                res.status(200).json(users);
            }
            catch(err){
                res.status(500).json(err);
            }
           
        }
        else{
            res.status(403).json("You are not allowed to see all users....!!!");
        }
    }
);

//Get User Stats

userRouter.get(
    "/stats",
    async(req,res)=>{
        const today = new Date();
        const letYear = today.setFullYear(today.setFullYear()-1);

                
        const monthsArray= [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ];

        try{
            const data = await User.aggregate([
                {
                    $project:{
                        month:{$month: "$createdAt"}
                    }
                },
                {
                    $group:   {
                        _id: "$month",
                        total: {$sum:1}
                    }
                }
            ]);
            res.status(200).json(data);
        }
        catch(err){
            res.status(500).json(err);
        }
    }
)




export default userRouter;