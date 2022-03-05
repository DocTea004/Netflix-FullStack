import express from "express";
import mongoose from "mongoose";
import "dotenv/config.js";
import authRouter from "./routes/auth.js";
import userRouter from "./routes/users.js";
import moviesRouter from "./routes/movie.js";

const app = express();
const port = process.env.PORT ||  8800;

mongoose.connect(
    process.env.MONGO_URL,
    {
        useNewUrlParser:true,
        useUnifiedTopology:true,
        //useCreateIndex: true
    }
)
.then(()=> console.log("Database Connected Successfully....!!!"))
.catch((err)=>console.log(err));

app.use(express.json());
app.use("/api/auth",authRouter);
app.use("/api/users",userRouter);
app.use("/api/movies", moviesRouter);

app.listen(
   port,
    ()=>{
        console.log(
            `Server connected at port ${port}`
        )
    }
)