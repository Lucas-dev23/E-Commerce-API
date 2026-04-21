import express from 'express';
import controller from '../controllers/CategoriaController.js';
import { validate } from '../middlewares/validate.js';
import { categoriaValidation } from '../validations/categoria.validation.js';
import { idParamValidation } from '../validations/param.validation.js';
import { queryValidation } from '../validations/query.validation.js';
import { authMiddleware } from '../middlewares/auth.js';
import { authorizeMiddleware } from '../middlewares/authorize.js';

const router = express.Router();

router.get(
    "/",
    validate(queryValidation, "query"),
    controller.listar
);

router.get(
    "/:id",
    validate(idParamValidation, "params"),
    controller.buscarPorId
);

// Exige autenticação apenas nas rotas abaixo
router.use(authMiddleware);

router.post(
    "/",
    validate(categoriaValidation, "body"),
    authorizeMiddleware(["Administrador"]),
    controller.criar
);

router.put(
    "/:id",
    validate(idParamValidation, "params"),
    validate(categoriaValidation, "body"),
    authorizeMiddleware(["Administrador"]),
    controller.atualizar
);

router.delete(
    "/:id",
    validate(idParamValidation, "params"),
    authorizeMiddleware(["Administrador"]),
    controller.deletar
);

export default router;