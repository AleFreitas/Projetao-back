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
      const removableSession = await db.collection("sessions").findOne({ idUser: checkUser._id })
      if (removableSession) {
        await db.collection("sessions").deleteOne({ idUser: checkUser._id });
      }

      const session = await db.collection("sessions").findOne({ token });
      await db.collection("sessions").updateOne({ _id: ObjectId(session._id) }, { $set: { idUser: checkUser._id } });

      const previousCart = await db.collection("carts").findOne({ idUser: checkUser._id });
      if (previousCart) {
        const previousCartItems = previousCart.chosenItems;
        await db.collection("carts").deleteOne({ idUser: checkUser._id });
      } else {
        const previousCartItems = [];
      }
      const currentCart = await db.collection("carts").findOne({ token });
      const currentCartItems = currentCart.chosenItems;
      const items = [...currentCartItems, ...previousCartItems];
      await db.collection("carts").updateOne({ token }, { $set: { chosenItems: [...items] } })
      await db.collection("carts").updateOne({ idUser }, { $set: { chosenItems: [...items] } })
      return res.status(200).send("Ok");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
}
