import bcrypt from "bcrypt";
import db from "../config/database.js";
import { userSchema } from "../Schemas/AuthSchema.js";
import { ObjectId } from "mongodb";

export async function signUp(req, res) {
  const { name, email, password, confirmPassword } = req.body;

  const { error } = userSchema.validate({
    name,
    email,
    password,
    confirmPassword,
  });

  if (error) {
    const errorMessages = error.details.map((err) => err.message);
    return res.status(422).send(errorMessages);
  }
  const userExists = await db.collection("users").findOne({ email });
  if (userExists) {
    return res.status(409).send("Este email já está em uso");
  }

  const passwordHashed = bcrypt.hashSync(password, 10);

  try {
    await db
      .collection("users")
      .insertOne({ name, email, password: passwordHashed });
    res.status(201).send("Usuário cadastrado com sucesso!");
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function signIn(req, res) {
  const { email, password } = req.body;
  // token vindo da session
  const authorization = req.headers.authorization;
  const token = authorization?.replace("Bearer ", "");

  try {
    const checkUser = await db.collection("users").findOne({ email });
    if (!checkUser) return res.status(400).send("Usuário ou senha incorretos");
    const isCorrectPassword = bcrypt.compareSync(password, checkUser.password);

    if (!isCorrectPassword) {
      return res.status(400).send("Usuário ou senha incorretos");
    }
    if (token) {
      const removableSession = await db.collection("sessions").findOne({ idUser: ObjectId(checkUser._id) })
      if (removableSession && (removableSession.token !== token)) {
        await db.collection("sessions").deleteOne({ idUser: checkUser._id });
      }
      const session = await db.collection("sessions").findOne({ token: token });
      const newSession = await db.collection("sessions").updateOne({ token }, { $set: { idUser: checkUser._id } });
      const previousCart = await db.collection("carts").findOne({ idUser: checkUser._id });
      let previousCartItems = [];
      if (previousCart) {
        previousCartItems = previousCart.chosenItems;
        const currentSession = await db.collection("carts").findOne({ idUser: checkUser._id, token:token });
        if (!currentSession) {
          await db.collection("carts").deleteOne({ idUser: checkUser._id });
        }
      }
      const currentCart = await db.collection("carts").findOne({ token });
      const currentCartItems = currentCart.chosenItems;
      const items = [...currentCartItems, ...previousCartItems];
      await db.collection("carts").deleteOne({ idUser: checkUser._id });
      await db.collection("carts").updateOne({ token }, { $set: { chosenItems: [...items], idUser: checkUser._id } })
      return res.status(200).send("Ok");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
}
