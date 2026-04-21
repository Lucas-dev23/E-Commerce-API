// Classe base para todos os tipos de erro
class AppError extends Error {

    constructor(message, statusCode = 500, validationErrors = null) {
        super(message);
        this.statusCode = statusCode;
        this.validationErrors = validationErrors;
    }
}

export default AppError;