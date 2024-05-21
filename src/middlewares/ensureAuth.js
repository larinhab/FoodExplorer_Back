const AppError = require('../utilis/AppError')
const authConfig = require('../configs/auth') // Status da autenticação
const { verify } = require("jsonwebtoken")
const e = require('express')

function ensureAuthenticated(request, response, next){ // função para conferir se o usuario é autenticado
    const authHeader = request.headers.authorization //acessando cabeçalho da req. e buscando o token

    if(!authHeader) {
        throw new AppError("JWT Token Inválido", 401) // VERIFICA SE O TOKEN EXISTE
    }

    const [, token] = authHeader.split(" ") 

    try{ // VERIFICANDO SE O TOKEN É VÁLIDO
        const {sub: user_id} = verify(token, authConfig.jwt.secret) 

        request.user = {
            id: Number(user_id),
        }

        return next()
    }catch{
        throw new AppError("JWT Token não informado", 401)
    }
}

module.exports = ensureAuthenticated 