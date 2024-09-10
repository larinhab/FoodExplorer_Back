const knex = require("../database/knex");

class FavoritesController {
  async create(request, response) {
    const user_id = request.user.id;
    const { plate_id } = request.body;

    const isFavorite = await knex("favorites")
      .where({user_id, plate_id})
      .first();

    if(!plate_id){
      return response.json({message: "O id do prato é obrigatório."})
    }

    if(isFavorite){
      return response.json({ message: "Este prato já está nos favoritos."})
    }else{
      await knex("favorites").insert({
        user_id,
        plate_id
      });
    }

      return response.json({ message: "Prato adicionado aos favoritos." });
  }

  async index(request, response) {
    const user_id = request.user.id;

    const myFavorites = await knex("favorites")
    .where({ user_id })
    .join("plates", "favorites.plate_id", "plates.id")
    .select("favorites.id", "plates.id as plates_id", "plates.name", "plates.image", "plates.price")

    return response.json(myFavorites);
  }

  async delete(request, response){
      const { id } = request.params
        
      const favorite = await knex("favorites")
      .where({ id })
      .first()

      if (!favorite) {
        return response.status(404).json({ message: "Prato favorito não encontrado." });
      }
  
      await knex("favorites")
      .where({ id })
      .delete()
    
      return response.json({ message: "Prato removido dos favoritos." });

  }
}

module.exports = FavoritesController;