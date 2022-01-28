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


export default userRouter;