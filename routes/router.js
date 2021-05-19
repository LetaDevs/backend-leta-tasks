import express from 'express';
import {check} from 'express-validator';
import auth from '../middlewares/auth.js';
import {iniciarSesion, autenticarUsuario} from '../controllers/authController.js';
import {
	confirmarCuenta,
	crearCuenta,
	guardarNuevoPassword,
	solicitudResetPassword,
	validarTokenResetPassword,
} from '../controllers/usersController.js';
import {
	crearProyecto,
	editarProyecto,
	eliminarProyecto,
	obtenerProyectos,
	obtenerProyectoUrl,
} from '../controllers/proyectosController.js';
import {cambiarEstadoTarea, crearTarea, editarTarea, eliminarTarea} from '../controllers/TareasController.js';

const router = express.Router();

// ------------------------------------------ USUARIOS -----------------------------------------------

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
router.post('/confirmar-cuenta/:token', confirmarCuenta);

// reestablecer password
router.post('/api/v1/reset-password', check('email', 'Email no válido').isEmail(), solicitudResetPassword);
// validar token de reset
router.post('/api/v1/reset-password/validacion/:token', validarTokenResetPassword);
// cambiar password
router.post(
	'/api/v1/reset-password/:token',
	check('password', 'El password debe tener mínimo 6 caracteres').not().isEmpty(),
	guardarNuevoPassword
);
//iniciar sesion
router.post('/api/v1/iniciar-sesion', [check('email', 'Email no válido').isEmail()], iniciarSesion);

router.post('/api/v1/autenticacion', autenticarUsuario);

// ------------------------------------ PROYECTOS --------------------------------------

// crear nuevo proyecto
router.post('/api/v1/proyectos/crear-proyecto', auth, crearProyecto);

//editar proyecto
router.put('/api/v1/proyectos/editar-proyecto/:proyectoId', auth, editarProyecto);

//eliminar proyecto
router.delete('/api/v1/proyectos/eliminar-proyecto/:proyectoid', auth, eliminarProyecto);

//obtener proyectos
router.get('/api/v1/proyectos/obtener-proyectos/:usuarioId', auth, obtenerProyectos);

// obtener proyecto por url
router.get('api/v1/proyectos/obtener-proyecto/:url', auth, obtenerProyectoUrl);

// ------------------------------------ TAREAS -------------------------------------------

//crear tarea
router.post('/api/v1/tareas/crear-tarea', auth, crearTarea);

//editar tarea
router.put('/api/v1/tareas/editar-tarea/:tareaId', auth, editarTarea);

//eliminar tarea
router.delete('/api/v1/tareas/eliminar-tarea/:tareaId', auth, eliminarTarea);

//cambiar estado tarea
router.patch('/api/v1/tareas/estado-tarea/:tareaId', auth, cambiarEstadoTarea);

export default router;
