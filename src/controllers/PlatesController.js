const AppError = require("../utilis/AppError")
const knex = require("../database/knex")

class PlatesController {
    async create(request, response){
        const { name, category, price, description } = request.body

        const [plate_id] = await knex("plates").insert({
            name,
            category,
            price,
            description,
        })

        return response.status(201).json({
            message: "Prato criado com sucesso!"
        })
    }

    async uptade(request, response){
        const { name, category, price, description } = request.body
        const { id } = request.params

        const plate = await knex("plates").where({ id }).first()

        plate.name = name ?? plate.name;
        plate.category = category ?? plate.category;
        plate.price = price ?? plate.price;
        plate.description = description ?? plate.description;

        await knex("plates").where({ id }).update({
            name: plate.name,
            category: plate.category,
            price: plate.price,
            description: plate.description,
            updated_at: new Date(),
          });
        
        return response.status(201).json({
            message: "Prato atualizado com sucesso"
        })
    }

    async delete(request, response){
        const { id } = request.params

        await knex("plates").where({ id }).delete()

        return response.status(201).json({
            message:"Prato excluído!"
        })
    }

    async show(request, response){
        const { id } = request.params

        const plate = await knex("plates").where({ id }).first()

        if(!plate){
            throw new AppError("Prato não encontrado")
        }

        return response.status(201).json({
            ...plate
        })
    }

    async index(request, response){

    }

}

module.exports = PlatesController;