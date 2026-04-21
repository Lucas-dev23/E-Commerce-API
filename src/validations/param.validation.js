import { z } from 'zod';

export const idParamValidation = z.object({
    id: z
        .string()
        .regex(/^\d+$/, "ID deve ser um número")
        .transform(Number)
});