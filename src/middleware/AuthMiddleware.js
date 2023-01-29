// import db from '../config/database.js'

// export async function authValidation(req, res, next) {
//   const { authorization } = req.headers
//   const token = authorization?.replace("Bearer ", '')

//   if (!token) return res.status(422).send("Informe o token!")

//   try {
//     const checkSession = await db.collection("sessions").findOne({ token })

//     if (!checkSession) return res.status(401).send("Usuario não autorizado! por favor tente novamente.")

//     res.locals.sessao = checkSession

//     next()

//   } catch (error) {
//     res.status(500).send(error)
//   }
// }