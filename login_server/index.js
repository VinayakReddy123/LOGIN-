import express from "express";
import { Connection } from "./database/db.js";
import  router from "./routes/route.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
const app=express();


app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use(bodyParser.json({extended:true}));
app.use('/',router);

Connection(); // connecting to mongodb before the server starts
app.listen(9000,()=>{
    console.log("Listening to localhost 9000 ");
})

