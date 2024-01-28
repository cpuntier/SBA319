import express from "express"
const router = express.Router();
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";


router.route('/')
.get(async (req,res,next) => {

        let collection = await db.collection('comments');
        let comments = await collection.find().toArray();
        console.log(comments);
        res.send(comments)
        }).post(async (req,res,next) => {
            let collection = await db.collection('comments');
            try {
    
                const post = await collection.insertOne({
                    charId: req.body.charId,
                    userId: req.body.userId,
                    content: req.body.content
                })
                res.send(post);
            } catch (error) {
                res.send(error);
                
            }
        })


        router.route('/:id') //matches id of comment gives you information on that comment.
        .get(async (req, res, next) => {
            let collection = await db.collection('comments');
            let comment = await collection.find({ _id: new ObjectId(req.params.id) }).toArray();
            console.log(comment);
            res.send(comment);
        }).patch(async (req, res, next) => {
            let collection = await db.collection('comments');
            try {
                const update = await collection.updateOne({ _id: new ObjectId(req.params.id) }, { $set: req.body })
                res.send(update);
            } catch (error) {
                res.send("Error updating");
            }
        }).delete(async (req, res, next) => {
            let collection = await db.collection('comments');
            try {
                const deletion = await collection.deleteOne({ _id:new ObjectId (req.params.id) });
                res.send(deletion);
            } catch (error) {
                res.send("Error deleting");
            }
        })
    

router.route('/')


export default router;