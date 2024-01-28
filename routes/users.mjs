import express from "express"
const router = express.Router();
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";


db.collection('users').createIndex({"_id": 1})
//created index for users sorted by id


router.route('/')
.get(async (req,res,next) => {

        let collection = await db.collection('users');
        let users = await collection.find().toArray();
        console.log(users);
        res.send(users)
        }).post(async (req,res,next) => {
            let collection = await db.collection('users');
            try {
    
                const post = await collection.insertOne({
                    userId: req.body.userId,
                    name : req.body.name
                })
                res.send(post);
            } catch (error) {
                res.send(error);
                
            }
        })

        router.route('/:id') //matches id of comment gives you information on that comment.
        .get(async (req, res, next) => {
            let collection = await db.collection('users');
            let comment = await collection.find({ _id: new ObjectId(req.params.id) }).toArray();
            console.log(comment);
            res.send(comment);
        }).patch(async (req, res, next) => {
            let collection = await db.collection('users');
            try {
                const update = await collection.updateOne({ _id: new ObjectId(req.params.id) }, { $set: req.body })
                res.send(update);
            } catch (error) {
                res.send("Error updating");
            }
        }).delete(async (req, res, next) => {
            let collection = await db.collection('users');
            try {
                const deletion = await collection.deleteOne({ _id:new ObjectId (req.params.id) });
                res.send(deletion);
            } catch (error) {
                res.send("Error deleting");
            }
        })



export default router;