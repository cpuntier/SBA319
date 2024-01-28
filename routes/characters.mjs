import express from "express"
const router = express.Router();
import db from "../db/conn.mjs";


db.collection('characters').createIndex({ "name": 1 })
//character index on field name since all queries are made using this field.

const validator = { //validator used in schema creation for characters collection
    $jsonSchema: {
        bsonType: "object",
        title: "Characters Validation",
        required: ["name", "description"],
        properties: {
            name: {
                bsonType: "string",
                description: "name must be a string and required"
            },
            description: {
                bsonType: "string",
                description: "description must be a string and required"
            },
            ratings: {
                bsonType: "array",
                description: "ratings must be an array of integers",
                items: {
                    bsonType: "int"
                }
            },
            img_url: {
                bsonType: "string",
                description: "img_url must be a string"
            }
        }
    }
}


//code below was only used to create collection using above validator
// db.createCollection("characters",{
//     validator: validator
// })



//route below is used to test validator.
router.route('/test')
    .post(async (req, res, next) => {
        console.log("Hello")
        let collection = await db.collection('characters');
        try {
           let attempt = await collection.insertOne(
                {
                    name: "Chris",
                    description: "Software Engineer",
                    ratings: [5.0, 5.0, 5.0, 5.4],
                    img_src: "Never before seen"
                })
            console.log("This is attempt",attempt);

            res.send(attempt);

        } catch (error) {
            res.send(error)

        }
    })



router.route('/')
    .get(async (req, res) => { // gets data on all characters in db

        let collection = await db.collection('characters');
        let characters = await collection.find().toArray();
        console.log(characters);
        res.send(characters)
    }).post(async (req, res, next) => {
        let collection = await db.collection('characters');
        try {
            const post = await collection.insertOne({
                name: req.body.name,
                description: req.body.description,
                ratings: req.body.ratings,
                img_src: req.body.img_src
            })
            res.send(post);
        } catch (error) {
            res.send(error);

        }
    })

router.route('/:name') //matches name of character gives you information on that character. Names are case sensitive
    //name is used instead of ID because realistically users will know names of characters rather than using an id
    .get(async (req, res, next) => {
        let collection = await db.collection('characters');
        let character = await collection.find({ name: req.params.name }).toArray();
        console.log(character);
        res.send(character);
    }).patch(async (req, res, next) => { //allows user to update data on character with specific name
        let collection = await db.collection('characters');
        try {
            const update = await collection.updateOne({ name: req.params.name }, { $set: req.body })
            res.send(update);
        } catch (error) {
            res.send("Error updating");
        }
    }).delete(async (req, res, next) => { // allows user to delete data on character with specific name
        let collection = await db.collection('characters');
        try {
            const deletion = await collection.deleteOne({ name: req.params.name });
            res.send(deletion);
        } catch (error) {
            res.send("Error deleting");
        }
    })


export default router;