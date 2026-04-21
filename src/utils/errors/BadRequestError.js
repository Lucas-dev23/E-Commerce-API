import AppError from "./AppError.js";

class BadRequestError extends AppError {

    constructor(message = "Requisição inválida", validationErrors = null) {
        super(message, 400, validationErrors);
    }
}

export default BadRequestError;