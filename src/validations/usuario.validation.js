import { z } from "zod";

export const criarUsuarioValidation = z.object({
    nome: z
        .string({ required_error: "Nome é obrigatório" })
        .trim()
        .min(1, "Nome não pode ser vazio")
        .max(25, "Nome muito longo"),

    email: z
        .string()
        .trim()
        .toLowerCase()
        .email("Email inválido ou vazio"),

    senha: z
        .string()
        .trim()
        .min(6, "Senha deve ter no mínimo 6 caracteres"),

    perfil_id: z
        .number({ required_error: "Perfil é obrigatório" })
});

export const loginUsuarioValidation = z.object({
    email: z
        .string()
        .trim()
        .email("Email inválido ou vazio"),

    senha: z
        .string()
        .trim()
        .min(1, "Por favor informe a senha")
})

export const atualizarUsuarioValidation = z.object({
    nome: z
        .string({ required_error: "Nome é obrigatório" })
        .trim()
        .min(1, "Nome não pode ser vazio")
        .max(25, "Nome muito longo"),

    email: z
        .string()
        .trim()
        .toLowerCase()
        .email("Email inválido ou vazio")
});

export const atualizarSenhaUsuarioValidation = z.object({
    senhaAtual: z
        .string()
        .trim()
        .min(6, "Senha deve ter no mínimo 6 caracteres"),

    novaSenha: z
        .string()
        .trim()
        .min(6, "Nova senha deve ter no mínimo 6 caracteres")
});

