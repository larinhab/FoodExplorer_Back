const AppError = require("../utilis/AppError");

function roleAuth( roleToVerify ) {
    return (request, response, next) => {
        const { role } = request.user;

        if(!roleToVerify.includes(role)){
            throw new AppError("Não autorizado", 401)
        } else {
            return next()
        }
    }   
}

module.exports = roleAuth;