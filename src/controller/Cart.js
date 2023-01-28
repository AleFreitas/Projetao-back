import bcrypt from 'bcrypt';
import { v4 as uuidV4 } from 'uuid';
import db from '../config/database.js';
import { postItemSchema } from '../Schemas/CartSchema.js';
import { ProductsSchema } from '../Schemas/ProductsSchema.js';

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
    const { product, quantity } = req.body;
    const authorization = req.headers.authorization;
    const token = authorization?.replace("Bearer ", "");

    const { error1 } = postItemSchema.validate({ token, product, quantity })
    const { error2 } = ProductsSchema.validate({ product })

    if (error1) {
        const errorMessages = error1.details.map(err => err.message)
        return res.status(422).send(errorMessages)
    } if (error2) {
        const errorMessages = error2.details.map(err => err.message)
        return res.status(422).send(errorMessages)
    }
    try {
        let cart = await db.collection("carts").findOne({ token })
        if (!cart) {
            return res.status(400).send("no such session in the server")
        }
        for (let i = 0; i < quantity; i++) {
            await db.collection("carts").updateOne({ token }, { $set: { chosenItems: [...cart.chosenItems, product] } })
            cart = await db.collection("carts").findOne({ token })
        }
        return res.status(200).send("item inserido com sucesso")
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

export async function removeItem(req, res) {
    const { product } = req.body;
    const authorization = req.headers.authorization;
    const token = authorization?.replace("Bearer ", "");

    try {
        const cart = await db.collection("carts").findOne({ token })
        if (!cart) {
            return res.status(400).send("no such session in the server")
        }
        const chosenItems = cart.chosenItems;
        let index = ""
        let j = 0
        for(let i of chosenItems){
            if(product.name === i.name){
                if(product.price === i.price){
                    if(product.description === i.description){
                        if(product.image === i.image){
                            index = j
                        }
                    }
                }
            }
            j++
        }
        if (typeof index === "string") {
            return res.status(400).send("this product is not on the cart")
        }
        chosenItems.splice(index, 1)

        await db.collection("carts").updateOne({ token }, { $set: { chosenItems: chosenItems } })

        return res.status(200).send("item removido com sucesso")
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

export async function cartItems(req, res) {
    const authorization = req.headers.authorization;
    const token = authorization?.replace("Bearer ", "");
    try {
        const cart = await db.collection("carts").findOne({ token })
        if (!cart) {
            return res.status(400).send("couldn't find a cart for this token")
        }
        return res.status(200).send(cart.chosenItems)
    } catch (error) {
        return res.status(500).send(error.message)
    }
}