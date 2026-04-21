import express from 'express';
import controller from '../controllers/UsuarioController.js';
import { validate } from '../middlewares/validate.js';
import {
    criarUsuarioValidation,
    loginUsuarioValidation,
    atualizarUsuarioValidation,
    atualizarSenhaUsuarioValidation
} from '../validations/usuario.validation.js';
import { idParamValidation } from '../validations/param.validation.js';
import { queryValidation } from '../validations/query.validation.js';
import { authMiddleware } from '../middlewares/auth.js';
import { authorizeMiddleware } from '../middlewares/authorize.js';

const router = express.Router();

router.post(
    "/",
    validate(criarUsuarioValidation, "body"),
    controller.criar
);

router.post(
    "/login",
    validate(loginUsuarioValidation, "body"),
    controller.login
)

router.use(authMiddleware);

router.get(
    "/",
    validate(queryValidation, "query"),
    authorizeMiddleware(["Administrador"]),
    controller.listar
);

router.get(
    "/:id",
    validate(idParamValidation, "params"),
    controller.buscarPorId
);

router.patch(
    "/:id",
    validate(idParamValidation, "params"),
    validate(atualizarUsuarioValidation, "body"),
    controller.atualizar
);

router.patch(
    "/:id/senha",
    validate(idParamValidation, "params"),
    validate(atualizarSenhaUsuarioValidation, "body"),
    controller.atualizarSenha
);

router.delete(
    "/:id",
    validate(idParamValidation, "params"),
    authorizeMiddleware(["Administrador"]),
    controller.deletar
);

export default router;