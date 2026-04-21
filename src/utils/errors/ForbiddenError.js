import AppError from "./AppError.js";

class ForbiddenError extends AppError {
    constructor (message = "Sem permissão") {
        super(message, 403)
    }
}

export default ForbiddenError;