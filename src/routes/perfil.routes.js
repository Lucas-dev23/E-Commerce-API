import express from 'express';
import controller from '../controllers/PerfilController.js'

const router = express.Router();

router.get(
    "/",
    controller.listar
);

export default router;