const e = require("express");
const AppError = require("../utilis/AppError");
const authConfig = require("../config/auth");
const {
  verify,
} = require("jsonwebtoken");

function ensureAuth(
  request,
  response,
  next
) {
  // const authHeader = request.headers.authorization
  const authHeader = request.headers;

  if (!authHeader.cookie) {
    throw new AppError(
      "JWT Token não informado",
      401
    );
  }

  const [, token] =
    authHeader.cookie.split("token=");

  try {
    const { role, sub: user_id } =
      verify(
        token,
        authConfig.jwt.secret
      );

    request.user = {
      id: Number(user_id),
      role,
    };

    return next();
  } catch {
    throw new AppError(
      "JWT Token Inválido",
      401
    );
  }
}

module.exports = ensureAuth;
