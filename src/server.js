require("express-async-errors") // IMPORTANDO O ASYNC ERRORS

const express = require("express") // IMPORTANDO EXPRESS
const app = express() // INICIALIZANDO EXPRESS 
const cors = require("cors") // POSSIBILITA QUE O BACK ATENDA O FRONT

const req = require("express/lib/request")
app.use(express.json()) // PADRÃO DAS REQUISIÇÕES

const uploadConfig = require("./config/upload.js")

const routes = require("./routes") 
app.use(cors({
    origin: true,
    credentials: true,
    })
) // COMPARTILHAMENTO DE RECURSOS
app.use(routes)
app.use("/files", express.static(uploadConfig.UPLOAD_FOLDER))

// DEFININDO A PORTA
const PORT = process.env.PORT || 2008
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`))

// ADICIONANDO O APP ERROR COMO PADRÃO DE ERROS
const AppError = require("./utilis/AppError.js")

app.use((error, request, response, next) => {
    if(error instanceof AppError){
        return response.status(error.statusCode).json({
            status:"error",
            message: error.message
        })
    }
    console.log(error)

    return response.status(500).json({
        status:"error",
        message: "Server Internal Error"
    })
});