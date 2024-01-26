import express from "express"
const router = express.Router();
import db from "../db/conn.mjs";


router.route('/')
    .get(async (req, res) => {
        let collection = await db.collection('characters');
        let characters = await collection.find().toArray();
        console.log(characters);
        res.send(characters)
    

        // if (req.query["rating"]) {
        //     const character = characters.filter((c) => c.avgRate > req.query.rating)
        //     if (character.length == 0) {
        //         res.send("No characters found")
        //     } else {
        //         res.json(character)
        //     }
        // } else {

        //     res.json(characters);
        // }
    })


export default router;