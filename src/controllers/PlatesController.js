const AppError = require("../utilis/AppError")
const knex = require("../database/knex")
const DiskStorage = require("../providers/DiskStorage")

class PlatesController {
    async create(request, response){
        const { name, category, price, description, ingredients } = request.body
        const image = request.file ? request.file.filename : null

        if(!name || !category || !price || !description){
            throw new AppError("Todos os campos devem ser preenchidos.")
        }

        if(!image) {
            throw new AppError("Imagem do prato é obrigatória")
        }

        const diskStorage = new DiskStorage()
        const filename = await diskStorage.saveFile(image)

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

        const ingredientsArray = typeof ingredients === 'string' ? ingredients.split(',').map(item => item.trim()) : ingredients;

        const ingredientsInsert = ingredientsArray.map((ingredient) => {
            return{
                plate_id,
                name: ingredient
            }
        })
            await knex("ingredients").insert(ingredientsInsert)

        return response.status(201).json({
            message: "Prato criado com sucesso!"
        })
    }

    async uptade(request, response){
        const { name, category, price, description, ingredients } = request.body
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

        if(ingredients){
            await knex("ingredients").where({ plate_id: id }).delete()
            const ingredientsArray = typeof ingredients === 'string' ? ingredients.split(',').map(item => item.trim()) : ingredients;

        const ingredientsInsert = ingredientsArray.map((ingredient) => {
            return{
                plate_id: id,
                name: ingredient
            }
        })
            await knex("ingredients").insert(ingredientsInsert)
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
        const ingredients = await knex("ingredients")
        .select(["id", "name"])
        .where({ plate_id: id})
        .orderBy("name")

        if(!plate){
            throw new AppError("Prato não encontrado")
        }

        return response.status(201).json({
            ...plate,
            ingredients
        })
    }

    async index(request, response){    
        const { search } = request.query

        let allPlates = await knex("plates")
        .select([
            "plates.id",
            "plates.name",
            "plates.description",
            "plates.category",
            "plates.price",
            "plates.image",
        ])
        .orderBy("plates.name");
    
        let allIngredients = await knex("ingredients");
    
        if (search) {
            const keywords = search.split(" ").map((keyword) => `%${keyword}%`);
            
            allPlates = await knex("plates")
            .select([
                "plates.id",
                "plates.name",
                "plates.description",
                "plates.category",
                "plates.price",
                "plates.image",
            ])
            .leftJoin("ingredients", "plates.id", "ingredients.plate_id")
            .where(function () {
                keywords.forEach((keyword) => {
                    this.orWhere("plates.name", "like", keyword)
                        .orWhere("plates.description", "like", keyword)
                        .orWhere("ingredients.name", "like", keyword)
                })
            })
            .groupBy("plates.id")
            .orderBy("plates.name");
        }
    
        const ingredientsByPlateId = {} 
        allIngredients.forEach(ingredient => {
            const { plate_id } = ingredient;
            if (!ingredientsByPlateId[plate_id]) {
                ingredientsByPlateId[plate_id] = []
            }
            ingredientsByPlateId[plate_id].push(ingredient)
        });
    
        const plateWithIngredients = allPlates.map(plate => {
            return {
                ...plate,
                ingredients: ingredientsByPlateId[plate.id] || [],
            };
        });
    
        return response.json(plateWithIngredients);
    }
}

module.exports = PlatesController;