const AppError = require("../utilis/AppError")
const knex = require("../database/knex")

const { hash, compare } = require("bcryptjs")

class UsersController {
    async create(request, response){
        const { name, email, password } = request.body

        const cryptPassword = await hash(password, 8)
        const checkIfEmailExist = await knex("users").where({ email }).first()

        if(checkIfEmailExist){
            throw new AppError("E-mail já cadastrado", 400)
        }

        await knex("users").insert({
            name,
            email,
            password: cryptPassword
        })

        return response.status(201).json({
            message: "Usuário criado com sucesso!"
        })
    }

    async uptade(request, response){
        const { name, email, password, oldPassword } = request.body
        const user_id = request.user.id

        const user = await knex("users").where({ id: user_id}).first()
        const userWithNewEmail = await knex("users").where({email}).first()
        
        if(!user){
            throw new AppError("Usuário não encontrado", 400)
        }

        if(userWithNewEmail && userWithNewEmail.id !== user.id) {
            throw new AppError("Email já está em uso", 400)
        }

        user.name = name ?? user.name
        user.email = email ?? user.email

        if(password && oldPassword){
            const checkPassoword = await compare(oldPassword, user.password)
                
            if(!checkPassoword){
                throw new AppError("A senha antiga não confere!")
            }        
            
            if(password === oldPassword) {
                throw new AppError("A senha nova deve ser diferente da antiga!")
            }

            if(password && !oldPassword){
                throw new AppError("Informe sua senha antiga!", 400)
            }
            
            user.password = await hash(password, 8)
        }

        await knex("users").where({ id: user_id }).update({
            name: user.name,
            email: user.email,
            password: user.password,
            updated_at: knex.fn.now()
        })

        return response.status(200).json({
            name: user.name,
            email: user.email,
            message: "Usuário alterado com sucesso"
        })
    }

    async delete(request, response) {
        const user_id = request.user.id
        //const { id } = request.params

        await knex("users").where({ id: user_id }).first().delete()

        return response.status(200).json({
            message: "Usuário deletado com sucesso!"
        })
    }
}

module.exports = UsersController;