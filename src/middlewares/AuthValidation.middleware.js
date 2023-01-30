import { sessionsCollection, usersCollection } from "../config/database.js";

export async function authValidation(req, res, next) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  if (!token) return res.status(401).send("Informe o token!");

  try {
    const checkSession = await sessionsCollection.findOne({ token });

    if (!checkSession)
      return res
        .status(401)
        .send("Usuario não autorizado! por favor tente novamente.");

    const userRegistered = await usersCollection.findOne({
      _id: checkSession?.userId,
    });

    if (!userRegistered) {
      res.status(401).send("UNAUTHORIZED");
      return;
    }

    res.locals.sessao = checkSession;
    res.locals.user = userRegistered;

    next();
  } catch (error) {
    res.status(500).send(error);
  }
}
