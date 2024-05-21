const AppError = require("../utilis/AppError")
const knex = require("../database/knex")
const { hash, compare } = require("bcryptjs")

class UsersController {
    async create(request, response){
        const { name, email, password } = request.body

        const cryptPassword = await hash(password, 8)
        const checkIfEmailExist = await knex("users").where({ email }).first()

        if (checkIfEmailExist){
            throw new AppError("E-mail já em uso", 400)
        }

        await knex("users").insert({
            name,
            email,
            password: cryptPassword
        })

        return response.json({
            message: "Usuário criado com sucesso!"
        }, 201)
    }

    async uptade(request, response){
        const { name, email, password, oldPassword } = request.body
        const user_id = request.user.id

        console.log(user_id)

        const user = await knex("users").where({ id: user_id}).first()
        
        await knex("users").where({ id: user_id }).update({
            name: user.name,
            email: user.email,
            password: user.password,
            uptade_at: knex.fn.now()
        })

        return response.status(200).json({
            name: user.name,
            email: user.email,
            message: "Usuário alterado com sucesso"
        })
    }

}

module.exports = UsersController;