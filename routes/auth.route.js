import express from "express";
import { body } from 'express-validator'
import { infoUser, login, register, refreshToken, logout } from "../controllers/auth.controller.js";
import { requireToken } from '../middlewares/requireToken.js';
import { validationResultExpress } from "../middlewares/validationResultExpress.js";

const router = express.Router();

//metodo router.post si entramos al navegador no tendremos acceso a esta ruta a no ser que usemos postman o la cambiemos a .get

router.post(
    "/register",
    [
        body("email", "formato de email incorrecto")
            .trim()
            .isEmail()
            .normalizeEmail(),
        body("password", "Mínimo 6 carácteres")
            .trim()
            .isLength({ min: 6 }),
        body("password", "formato de password incorecto")
            .custom((value, { req }) => {
                if (value !== req.body.repassword) {
                    throw new Error('las contraseñas no coinciden');
                }
                return value;
            }),
    ],
    validationResultExpress,
    register
);

router.post('/login', [
    body("email", "formato de email incorrecto")
        .trim()
        .isEmail()
        .normalizeEmail(),
    body("password", "Mínimo 6 carácteres")
        .trim()
        .isLength({ min: 6 })], 
        validationResultExpress,
        login
);

router.get('/protected',requireToken,infoUser);
router.get('/refresh', refreshToken);
router.get('/logout', logout);

export default router;