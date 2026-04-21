import { z } from 'zod'

export const queryValidation = z.object({
    page: z
        .string()
        .regex(/^\d+$/, "Page deve ser um número")
        .transform(Number)
        .refine(value => value >= 1, "Page deve ser maior que 0")
        .default("1"),

    limit: z
        .string()
        .regex(/^\d+$/, "Limit deve ser um número")
        .transform(Number)
        .refine(value => value >= 1, "Limit deve ser maior que 0")
        .refine(value => value <= 50, "Limit máximo é 50")
        .default("10"),

    nome: z.string().optional()
});