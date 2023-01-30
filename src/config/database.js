import { MongoClient} from "mongodb";

import dotenv from 'dotenv';

dotenv.config();

const mongoClient = new MongoClient(process.env.DATABASE_URL);
let db;

try {
    await mongoClient.connect()
    console.log("Conectado ao MongoDB.");
    db = mongoClient.db();
} catch (err) {
    console.log(`conexão falhou  mongoDB : ${err.message}`);
}
export const usersCollection = db.collection("users");
export const sessionsCollection = db.collection("sessions");
export const productsCollection = db.collection("products");
export const cartsCollection = db.collection("carts");
export const CheckoutCollection = db.collection("checkout");
export default db