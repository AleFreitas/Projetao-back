import bcrypt from 'bcrypt';
import { v4 as uuidV4 } from 'uuid';
import db from '../config/database.js';
import { cartSchema, postItemSchema } from '../Model/CartSchema.js';

export async function getNumberOfItems(req, res) {
    const authorization = req.headers.authorization;
    const token = authorization?.replace("Bearer ", "");
    try {
        const cart = await db.collection("carts").findOne({ token })
        return res.status(200).send({ num: cart.chosenItems.length })
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

export async function postItem(req, res) {
    const { productId, quantity } = req.body;
    const authorization = req.headers.authorization;
    const token = authorization?.replace("Bearer ", "");

    const { error } = postItemSchema.validate({ token, productId, quantity })

    if (error) {
        const errorMessages = error.details.map(err => err.message)
        return res.status(422).send(errorMessages)
    }
    try {
        let cart = await db.collection("carts").findOne({ token })
        if (!cart) {
            return res.status(400).send("no such session in the server")
        }
        for (let i = 0; i < quantity; i++) {
            await db.collection("carts").updateOne({ token }, { $set: { chosenItems: [...cart.chosenItems, productId] } })
            cart = await db.collection("carts").findOne({ token })
        }
        return res.status(200).send("item inserido com sucesso")
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

export async function removeItem(req, res) {
    const { productId } = req.body;
    const authorization = req.headers.authorization;
    const token = authorization?.replace("Bearer ", "");

    try {
        const cart = await db.collection("carts").findOne({ token })
        if (!cart) {
            return res.status(400).send("no such session in the server")
        }
        if(!cart.chosenItems.includes(productId)){
            return res.status(400).send("this product is not on the cart")
        }
        const chosenItems = cart.chosenItems;
        const index = chosenItems.indexOf(productId)
        chosenItems.splice(index, 1)

        await db.collection("carts").updateOne({ token }, { $set: { chosenItems: chosenItems } })
        
        return res.status(200).send("item removido com sucesso")
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

export async function cartItems(req,res){
    const authorization = req.headers.authorization;
    const token = authorization?.replace("Bearer ", "");
    try{
        const cart = await db.collection("carts").findOne({ token })
        if(!cart){
            return res.status(400).send("couldn't find a cart for this token")
        }
        return res.status(200).send(cart.chosenItems)
    } catch (error) {
        return res.status(500).send(error.message)
    }
}