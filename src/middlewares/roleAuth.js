const AppError = require("../utils/AppError");


function roleAuth(roleToVerify){
    return (request, response, next) => {
        const { role } = request.user;

        if(!roleToVerify.includes(role)){
            throw new AppError("Não autorizado", 401)
        } else {
            return next()
        }

        return response.status(201)
    }   
}

module.exports = roleAuth