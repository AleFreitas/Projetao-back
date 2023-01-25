import { MongoClient } from "mongodb";
import dotenv from 'dotenv';

dotenv.config();

const mongoClient = new MongoClient(process.env.DATABASE_URL);
let db;

try {
    await mongoClient.connect()
    console.log("successfully connected to MongoDB!");
    db = mongoClient.db();
} catch (err) {
    console.log(`failed to conect to mongoDB : ${err.message}`);
}

export default db