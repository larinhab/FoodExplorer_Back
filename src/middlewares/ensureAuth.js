const e = require('express')
const AppError = require('../utilis/AppError')
const authConfig = require('../config/auth')
const { verify } = require("jsonwebtoken")

function ensureAuth(request, response, next){ 
    const authHeader = request.headers.authorization //acessando cabeçalho da req. e buscando o token

    if(!authHeader) {
        throw new AppError("JWT Token não informado", 401) // VERIFICA SE O TOKEN EXISTE
    }

    const [, token] = authHeader.split(" ") 

    try{ // VERIFICANDO SE O TOKEN É VÁLIDO
        const {sub: user_id} = verify(token, authConfig.jwt.secret) 

        request.user = {
            id: Number(user_id),
        }

        return next()
    }catch{
        throw new AppError("JWT Token Inválido", 401)
    }
}

module.exports = ensureAuth