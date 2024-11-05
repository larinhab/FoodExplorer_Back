const AppError = require("../utilis/AppError");
const authConfig = require("../config/auth");
const knex = require("../database/knex");

const {
  sign,
} = require("jsonwebtoken");
const { compare } = require("bcryptjs");

class SessionsController {
  async create(request, response) {
    const { email, password } =
      request.body;

    const user = await knex("users")
      .where({
        email,
      })
      .first();

    if (!user) {
      throw new AppError(
        "Usuário não encontrado",
        401
      );
    }

    const passwordValid = await compare(
      password,
      user.password
    );

    if (!passwordValid) {
      throw new AppError(
        "E-mail e/ou senha inválidos"
      );
    }

    const { secret, expiresIn } =
      authConfig.jwt;
    const token = sign(
      {
        role: user.role,
      },
      secret,
      {
        subject: String(user.id),
        expiresIn,
      }
    );

    response.cookie("token", token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 15 * 60 * 1000,
    });

    delete user.password;
    delete user.email;

    return response.status(200).json({
      user,
      // token,  - removendo token da resposta para adc no cookie
      message: "Sessão iniciada",
    });
  }
}

module.exports = SessionsController;
