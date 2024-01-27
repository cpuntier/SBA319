import express from "express"
const router = express.Router();
import db from "../db/conn.mjs";


router.route('/')
    .get(async (req, res) => {

        let collection = await db.collection('characters');
        let characters = await collection.find().toArray();
        console.log(characters);
        res.send(characters)
        }).post(async (req,res,next) => {
            let collection = await db.collection('characters');
            try {
    
                const post = await collection.insertOne({
                    name : req.body.name,
                    description: req.body.description,
                    ratings : req.body.ratings,
                    img_src: req.body.img_src
                })
                res.send(post);
            } catch (error) {
                res.send(error);
                
            }
        })
    




router.route('/:name') //matches name of character gives you information on that character. Names are case sensitive
    .get( async (req,res,next) => {
        let collection = await db.collection('characters');
        let characters = await collection.find({name:req.params.name}).toArray();
        console.log(characters);
        res.send(characters);
    })






export default router;