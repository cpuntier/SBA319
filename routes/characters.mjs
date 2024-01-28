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
        let character = await collection.find({name:req.params.name}).toArray();
        console.log(character);
        res.send(character);
    }).patch(async (req,res,next) => {
        let collection = await db.collection('characters');
        try{
            const update = await collection.updateOne({name:req.params.name},{$set:req.body})
            res.send(update);
        }catch(error){
            res.send("Error updating");
        }
    }).delete(async(req,res,next) => {
        let collection = await db.collection('characters');
        try{
            const deletion = await collection.deleteOne({name: req.params.name});
            res.send(deletion);
        }catch(error){
            res.send("Error deleting");
        }
    })






export default router;