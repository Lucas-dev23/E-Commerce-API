function errorHandler(err, req, res, next) {
    console.log("🔥 [ERROR HANDLER] Entrou aqui");
    console.log("📛 [ERROR HANDLER] Tipo:", err.constructor.name);
    console.log("📛 [ERROR HANDLER] Mensagem:", err.message);
    console.log("📛 [ERROR HANDLER] ValidationErrors:", err.validationErrors);

    const status = err.statusCode || 500;

    const response = {
        timestamp: new Date().toISOString(),
        status,
        error: getErrorName(status),
        message: err.message || "Erro interno do servidor",
        path: req.originalUrl,
        validationErrors: err.validationErrors || null
    };

    if (status === 500) {
        console.error(err);
    }

    return res.status(status).json(response);
}

function getErrorName(status) {
    const map = {
        400: "Bad Request",
        401: "Unauthorized",
        403: "Forbidden",
        404: "Not Found",
        409: "Conflict",
        500: "Internal Server Error"
    };

    return map[status] || "Error";
}

export default errorHandler;