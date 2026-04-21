import BadRequestError from '../utils/errors/BadRequestError.js';

// Middleware de validação do zod
export function validate(schema, property = "body") {

    // next → passa pro próximo middleware
    return (req, res, next) => {
        try {

            // Executando a validação do Zod e substituindo os dados originais pelo validado
            const data = schema.parse(req[property]);

            if (property === "query") {
                // Evita sobrescrever req.query mantém dados originais intactos para paginação que utiliza string
                req.validatedQuery = data;
            } else {
                // se for body ou params substitui dados originais pelos validados (Evita salvar os dados enviados com espaçamento ou em maiúsculo por exemplo zod já limpa tudo)
                req[property] = data;
            }

            // Se não tiver erros de validação passa para a controller
            next();

        } catch (error) {

            if (error.name === "ZodError") {

                /*
                    Monta objeto de erro, exemplo:
                    {
                        nome: "Nome é obrigatório",
                        preco: "Preço deve ser um número"
                    }
                */
                const validationErrors = {};

                // Para cada erro de validação, pega o nome do campo e associa com a mensagem de erro
                error.issues.forEach(err => {
                    validationErrors[err.path[0]] = err.message;
                });

                return next(new BadRequestError("Dados inválidos", validationErrors));
            }

            /*
                Aqui express ignora a controller 
                e vai para o middleware de erro global app.use(erroHandler)
            */
            next(error);
        }
    };
}