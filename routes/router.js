import express from 'express';
import {check} from 'express-validator';
import {
	confirmarCuenta,
	crearCuenta,
	guardarNuevoPassword,
	solicitudResetPassword,
	validarTokenResetPassword,
} from '../controllers/usersController.js';
import {iniciarSesion} from '../controllers/authController.js';
import auth from '../midlewares/auth.js';

const router = express.Router();

// crear cuenta
router.post(
	'/api/v1/crear-cuenta',
	[
		check('nombre', 'El nombre es obligatorio').not().isEmpty(),
		check('email', 'Email no válido').isEmail(),
		check('password', 'El password debe tener minimo 6 caracteres').isLength({min: 6}),
	],
	crearCuenta
);

// confirmar cuenta
router.get('/confirmar-cuenta/:token', confirmarCuenta);

// reestablecer password
router.post('/api/v1/reset-password', check('email', 'Email no válido').isEmail(), solicitudResetPassword);
// validar token de reset
router.get('/reset-password/:token', validarTokenResetPassword);
// cambiar password
router.post(
	'/api/v1/reset-password/:token',
	check('password', 'El password debe tener mínimo 6 caracteres').not().isEmpty(),
	guardarNuevoPassword
);
//iniciar sesion
router.post(
	'/api/v1/iniciar-sesion',
	[
		check('email', 'Email no válido').isEmail(),
		check('password', 'El password debe tener minimo 6 caracteres').isLength({min: 6}),
	],
	iniciarSesion
);

export default router;
