import AppError from "./AppError.js";

class ConflictError extends AppError {

    constructor(message = "Conflito de dados") {
        super(message, 409)
    }
}

export default ConflictError;