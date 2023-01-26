import bcrypt from 'bcrypt';
import { v4 as uuidV4 } from 'uuid';
import db from '../config/database.js';
import { cartSchema, postItemSchema } from '../Model/CartSchema.js';

export async function createCart(req, res) {
    const { sessionId, chosenItems } = req.body;

    const { error } = cartSchema.validate({ sessionId, chosenItems })

    if (error) {
        const errorMessages = error.details.map(err => err.message)
        return res.status(422).send(errorMessages)
    }

    try {
        await db.collection("carts").insertOne({ userId: "", sessionId, chosenItems })
        res.sendStatus(201)

    } catch (error) {
        res.status(500).send(error.message)
    }
}

export async function getNumberOfItems(req, res) {
    const { sessionId } = req.body;
    try {
        const cart = await db.collection("carts").findOne({ sessionId })
        res.status(200).send({ num: cart.chosenItems.length })
    } catch (error) {
        res.status(500).send(error.message)
    }
}

export async function postItem(req, res) {
    const { sessionId, productId, quantity } = req.body;
    
    const { error } = postItemSchema.validate({ sessionId, productId, quantity })

    if (error) {
        const errorMessages = error.details.map(err => err.message)
        return res.status(422).send(errorMessages)
    }
    try {
        let cart = await db.collection("carts").findOne({ sessionId })
        if (!cart) {
            res.status(400).send("no such session in the server")
        }
        for (let i = 0; i < quantity; i++) {
            await db.collection("carts").updateOne({ sessionId }, { $set: { chosenItems: [...cart.chosenItems, productId] } })
            cart = await db.collection("carts").findOne({ sessionId })
        }
        res.status(200).send("item inserido com sucesso")
    } catch (error) {
        res.status(500).send(error.message)
    }
}