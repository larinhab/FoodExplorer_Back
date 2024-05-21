const AppError = require("../utilis/AppError")
const authConfig = require("../config/auth")
const knex = require("../database/knex")

const { sign } = require("jsonwebtoken")
const { compare } = require("bcryptjs")

class SessionsController {
    async create(request, response){
        const { email, password } = request.body

        const user = await knex("users").where({ email }).first()
        const passwordValid = await compare(password, user.password)

        if(!user){
            throw new AppError("Usuário não encontrado", 401)
        }

        if(!passwordValid){
            throw new AppError("E-mail e/ou senha inválidos")
        }

        const { secret, expiresIn } = authConfig.jwt
        const token = sign({}, secret, {
            subject: String(user.id),
            expiresIn
        })

        return response.status(200).json({
            user,
            token,
            message: "Sessão iniciada"
        }, 201)
    }
}


module.exports = SessionsController