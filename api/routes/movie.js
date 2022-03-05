import express from "express";
import verify from "../verifyToken.js";
import Movie from "../models/Movie.js";

const moviesRouter = express.Router();

//Create 

moviesRouter.post(
    "/",
    verify,
    async(req,res)=>{
        if(req.user.isAdmin){
            const newMovie = new Movie(req.body);

            try{
                const savedMovie = await newMovie.save();
                res.status(200).json(savedMovie);
            }
            catch(err){
                res.status(500).json(500);
            }
        }
        else{
            res.status(403).json("You are not allowed")
        }
    }
)
//update

moviesRouter.put(
    "/:id",
    verify,
    async(req,res)=>{
        if(req.user.isAdmin){
            try{
                const updatedMovie = await Movie.findByIdAndUpdate(
                    req.params.id,
                    {
                    $set:req.body
                    },
                    {
                        new : true
                    }
                    )
                res.status(200).json(updatedMovie);
            }
            catch(err){
                res.status(500).json(err);
            }
        }
        else{
            res.status(500).json("You are not allowed");
        }
    }

);

//Delete

moviesRouter.delete(
    "/:id",
    verify,
    async(req,res)=>{
        if(req.user.isAdmin){
            try{
                await Movie.findByIdAndDelete(req.params.id);
                res.status(200).json("The movie has been deleted.....!!!");

            }
            catch(err){
                res.status(500).json(err);
            }
        }
        else{
            res.status(403).json("You are not allowed.....");
        }
    }
);

//get
moviesRouter.get(
    "/find/:id",
    verify,
    async(req,res)=>{
        try{
            const movie = await Movie.findById(req.params.id);
            res.status(200).json(movie);
        }
        catch(err){
            res.status(500).json(err);
        }
    }
);

//Get All
moviesRouter.get(
    "/",
    verify,
    async(req,res)=>{
        if(req.user.isAdmin){
            try{
                const movies = await Movie.find();
                res.status(200).json(movies.reverse());
            }
            catch(err){
                res.status(500).json(err);
            }
        }
        else{
            res.status(403).json("You are not allowed....!!!!");
        }
    }
)

//Get Random Movie

moviesRouter.get(
    "/random",
    verify,
    async(req,res)=>{
        const type = req.query.type;
        let movie;
        try{
            if(type==="series"){
                movie = await Movie.aggregate([
                    { $match : {isSeries : true}},
                    {$sample : {size : 1}},
                ])
            }
            else{
                movie = await Movie.aggregate([
                    { $match : {isSeries : false}},
                    { $sample : {size: 1}}
                ])
            }
            res.status(200).json(movie);
        }
        catch(err){
            res.status(500).json(err);
        }
    }
);


export default moviesRouter;


