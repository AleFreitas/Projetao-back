import { sessionsCollection, usersCollection } from "../config/database.js";

export async function authValidation(req, res, next) {
  const { authorization } = req.headers;
  console.log(authorization)
  const token = authorization?.replace("Bearer ", "");

  if (!token) return res.status(401).send("Informe o token!");

  try {
    const checkSession = await sessionsCollection.findOne({ token });
    console.log(checkSession);

    if (!checkSession)
      return res
        .status(401)
        .send("Usuario não autorizado! por favor tente novamente.");

    const userRegistered = await usersCollection.findOne({
      _id: checkSession?.idUser,
    });

    if (!userRegistered) {
      res.status(401).send("UNAUTHORIZED");
      return;
    }

    res.locals.session = checkSession;
    res.locals.user = userRegistered;

    next();
  } catch (error) {
    const errorMessages = error.details.map(err => err.message)
        return res.status(500).send(errorMessages)
  }
}
