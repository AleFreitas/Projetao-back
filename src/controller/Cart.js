import bcrypt from 'bcrypt';
import { v4 as uuidV4 } from 'uuid';
import db from '../config/database.js';
import { cartSchema } from '../Model/CartSchema.js';

export async function getNumberOfItems(req,res){
  const { userId } = req.body;

  try {
    const cart = await db.collection("carts").findOne({ userId })
    res.status(200).send(cart.chosenItems.length)
  } catch (error) {
    res.status(500).send(error.message)
  }
}
