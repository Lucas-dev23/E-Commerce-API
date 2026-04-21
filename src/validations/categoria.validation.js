import { z } from 'zod';

export const categoriaValidation = z.object({
    nome: z
        .string({ required_error: "Nome é obrigatório" })
        .trim()
        .min(1, "Nome não pode ser vazio")
        .max(25, "Nome muito longo")
});

