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
    const { product } = req.body;
    const authorization = req.headers.authorization;
    const token = authorization?.replace("Bearer ", "");

    const { error1 } = postItemSchema.validate({ token, product })
    const { error2 } = ProductsSchema.validate({ product })

    if (error1) {
        const errorMessages = error1.details.map(err => err.message)
        return res.status(422).send(errorMessages)
    } if (error2) {
        const errorMessages = error2.details.map(err => err.message)
        return res.status(422).send(errorMessages)
    }
    try {
        const cart = await db.collection("carts").findOne({ token })
        if (!cart) {
            return res.status(400).send("no such session in the server")
        }
        let chosenItems = cart.chosenItems
        for (let i of chosenItems) {
            if (product.name === i.name) {
                if (product.price === i.price) {
                    if (product.description === i.description) {
                        if (product.image === i.image) {
                            i.quantity += product.quantity
                            await db.collection("carts").updateOne({ token }, { $set: { chosenItems: [...chosenItems] } })
                            return res.status(200).send("quantidade atualizada")
                        }
                    }
                }
            }
        }
        await db.collection("carts").updateOne({ token }, { $set: { chosenItems: [...cart.chosenItems, product] } })
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
        for (let i of chosenItems) {
            if (product.name === i.name) {
                if (product.price === i.price) {
                    if (product.description === i.description) {
                        if (product.image === i.image) {
                            i.quantity -= 1
                            await db.collection("carts").updateOne({ token }, { $set: { chosenItems: chosenItems } })
                            index = j
                            if (i.quantity > 0) {
                                return res.status(200).send("quantidade atualizada")
                            }
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

export async function totalPrice(req, res){
    const authorization = req.headers.authorization;
    const token = authorization?.replace("Bearer ", "");
    try {
        const cart = await db.collection("carts").findOne({ token })
        if (!cart) {
            return res.status(400).send("couldn't find a cart for this token")
        }
        let price = 0
        for(let i of cart.chosenItems){
            console.log(price)
            price+=(parseInt(i.price)*i.quantity)
        }
        return res.status(200).send({price})
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

//FUNÇÃO APENAS PARA TESTES
export async function removeSessions(req, res) {
    try {
        const sessions = await db.collection("sessions").deleteMany({})
        res.send(200)
    }catch (error) {
        return res.status(500).send(error.message)
    }
}
export async function removeCarts(req, res){
    try {
        const sessions = await db.collection("carts").deleteMany({})
        res.send(200)
    }catch (error) {
        return res.status(500).send(error.message)
    }
}

export async function removeUsers(req,res){
    try {
        const sessions = await db.collection("users").deleteMany({})
        res.send(200)
    }catch (error) {
        return res.status(500).send(error.message)
    }
}