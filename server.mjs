import express from 'express'
import "dotenv/config"
import db from "./db/conn.mjs"
const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

// app.use(async (req,res,next) => {
// //    req.movies = await db.collection('movies');
//     console.log("movies awaited")
// })

app.get("/",async (req,res) => {
    let collection = await db.collection('movies');
    let moviesTest = await collection.find({runtime:11}).toArray();
    console.log("hello1")
    res.send(moviesTest)
})

app.listen(PORT,()=>{
    console.log("The server is waiting to serve you to table: ", PORT);
});