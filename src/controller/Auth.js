import bcrypt from "bcrypt";
import { v4 as uuidV4 } from "uuid";
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

export async function session(req, res, next) {
  const token = uuidV4();
  try {
    
    await db.collection("sessions").insertOne({ idUser: " ", token });
    
    return res.status(200).send("Sessão criada")
  } catch (error) {
    res.status(500).send(error.message);
  }
  res.locals.user = user;
  next();
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

    if (!isCorrectPassword)
      return res.status(400).send("Usuário ou senha incorretos");

      if (token) {
        const session = await db.collection("sessions").findOne({ token });
        await db.collection("sessions").updateOne({_id:ObjectId(session._id)},  {$set:{idUser: checkUser._id}});
        return res.status(200).send("Ok");
      }
  } catch (error) {
    res.status(500).send(error.message);
  }
}
