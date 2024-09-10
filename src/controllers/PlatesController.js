const AppError = require("../utilis/AppError")
const knex = require("../database/knex")
const DiskStorage = require("../providers/DiskStorage")

class PlatesController {
    async create(request, response){
        const { name, category, price, description } = request.body
        const image = request.file.filename
        const diskStorage = new DiskStorage()
        const filename = await diskStorage.saveFile(image)

        if(!name || !category || !price || !description){
            throw new AppError("Todos os campos devem ser preenchidos.")
        }

        if(price.length < 1 ){
            throw new AppError("O preço deve ser maior que R$0")
        }


        const [plate_id] = await knex("plates").insert({
            name,
            category,
            price,
            description,
            image: filename,
        })

        return response.status(201).json({
            message: "Prato criado com sucesso!"
        })
    }

    async uptade(request, response){
        const { name, category, price, description } = request.body
        const { id } = request.params
        const image = request.file?.filename

        const plate = await knex("plates").where({ id }).first()
        
        if(!plate){
            throw new AppError("Prato não encontrado")
        }
        
        const plateUpdate = {
            name: name ?? plate.name,
            category: category ?? plate.category,
            price: price ?? plate.price,
            description: description ?? plate.description,
            updated_at: knex.fn.now()
        }   

        if(image){
            const diskStorage = new DiskStorage()
            if(plate.image){
                await diskStorage.deleteFile(plate.image)
            }
        
            const filename = await diskStorage.saveFile(image)
            plateUpdate.image = filename
        }

        
        await knex("plates").where({ id })
        .update( plateUpdate );
        
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