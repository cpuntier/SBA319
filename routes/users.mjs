import express from "express"
const router = express.Router();
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

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


export default router;