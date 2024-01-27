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
app.get("/seed", async (req, res) => {
    let collection = await db.collection('testcollection');
    try {
      // These methods should work for both, MongoDB Native Driver OR Mongoose
      // This will delete everything in the collection before the insetMany is ran,
      // this is done to prevent the database from getting cluttered. 
      // Below I'm using the Model like I would do in Mongoose but if you're using the Native Driver it'll be something like this (await collection.deleteMany({}) 
      await collection.deleteMany({}) 
      await collection.insertMany([
        {
          name: "Superman",
          powers: ["Flying", "Super Strength", "Laser Vision"],
          weakness: "Kryptonite"
        },
        {
          name: "Spiderman",
          powers: ["Web Slinging", "Super Strength", "Spidey Senses"],
          weakness: "Pizza"
        },
        {
          name: "Iron Man",
          powers: ["Flying", "Bulletproof", "Laser Blasters"],
          weakness: "Infinity Gauntlet"
        }
      ])
      res.send("OK")
    } catch (err) {
      res.status(500).send("Something went wrong.")
    }
  })
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