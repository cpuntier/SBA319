import express from 'express'
import "dotenv/config"
import db from "./db/conn.mjs"
const PORT = process.env.PORT || 3000;

import router from "./routes/characters.mjs";

const app = express();

app.use(express.json());

// app.use(async (req,res,next) => {
// //    req.movies = await db.collection('movies');
//     console.log("movies awaited")
// })

app.use("/characters", router);

app.get("/",async (req,res) => {
    let collection = await db.collection('characters');
//    console.log(collection);
    let moviesTest = await collection.find().toArray();
    console.log(moviesTest);
    res.send(moviesTest)
})

app.listen(PORT,()=>{
    console.log("The server is waiting to serve you to table: ", PORT);
});