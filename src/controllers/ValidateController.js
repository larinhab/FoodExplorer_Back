const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class ValidateController {
  async execute(request, response) {
    const { user } = request;

    const checkUserExist = await knex(
      "users"
    ).where({ id: user.id });

    if (checkUserExist.length === 0) {
      throw new AppError(
        "Unauthorized",
        401
      );
    }

    return response.status(200).json();
  }
}

module.exports = ValidateController;
