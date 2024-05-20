const AppError = require("../utilis/AppError")
const knex = require("../database/knex")
const { hash, compare } = require("bcrypt")

class UsersController {
    async create(request, response){
        const { name, email, password } = request.body

        const cryptPassword = await hash(password, 8)
        const checkIfEmailExist = await knex("users").where({ email }).first()

        await knex("users").insert({
            name,
            email,
            password: cryptPassword
        })

        return response.json({
            message: "Usuário criado com sucesso!"
        })
    }

}

module.exports = UsersController;