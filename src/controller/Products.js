import db from "../config/database.js";
import { ObjectId } from 'mongodb';

export async function listProducts(req, res) {
  const token = uuidV4();
  try {
    await db.collection("sessions").insertOne({ idUser: "", token });
    await db.collection("carts").insertOne({ userId: "", token, chosenItems:[] })
    const dados = await db.collection("products").find().toArray();
    return res.send({dados, token});
  } catch (error) {
    res.status(500).send("Deu algo errado no servidor");
  }
}

export async function getProductById(req, res) {
  
  try {
    const { id } = req.params;
    const product = await db
      .collection("products")
      .findOne({ _id: ObjectId(id) });
    if (!product) {
      res.send("Não existe esse produto");
    }
    return res.send(product);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

export async function createProduct(req, res) {
  try {
    const product = req.body;
    const productExist = await db
      .collection("products")
      .findOne({ name: product.name });

    if (productExist)
      return res.status(409).send("Esse produto já está cadastrado!");

    const data = await db.collection("products").insertOne({
      name: product.name,
      price: product.price,
      description: product.description,
      image: product.image,
    });
    console.log(data);
    res.send("ok");
  } catch (err) {
    console.log(err);
    res.status(500).send("Deu algo errado no servidor");
  }
}

export async function deleteProduct(req, res) {
  const { id } = req.params;
  try {
    await db.collection("products").deleteOne({ _id: ObjectId(id) });
    res.status(202).send("Ok");
  } catch (error) {
    res.status(500).send("Deu algo errado no servidor");
  }
}
