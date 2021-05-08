import Usuarios from '../models/Usuarios.js';
import bcrypt from 'bcrypt-nodejs';
import crypto from 'crypto';
import enviarEmail from '../handlers/emailHandler.js';
import {validationResult} from 'express-validator';

const crearCuenta = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.json(errors);
	}

	const {email} = req.body;

	const validarRegistro = await Usuarios.findOne({email});
	if (validarRegistro) return res.status(400).json({errors: [{msg: 'Email ya registrado'}]});

	try {
		let usuario = new Usuarios(req.body);
		usuario.password = await bcrypt.hashSync(usuario.password, bcrypt.genSaltSync(10));
		const token = crypto.randomBytes(10).toString('hex');
		usuario.token = token;

		await usuario.save();

		const url = `${process.env.FRONTEND_URL}/validar-token`;

		enviarEmail({
			usuario,
			subject: 'Confirma tu cuenta de LETA-Tasks',
			archivo: 'confirmarCuenta',
			url,
			token,
		});

		res.status(201).json({code: 201, msg: 'Usuario registrado con exito'});
	} catch (error) {
		res.status(500).json({errors: [{msg: 'Ocurrió un error inesperado'}]});
	}
};

const confirmarCuenta = async (req, res) => {
	const {token} = req.params;

	let usuario = await Usuarios.findOne({token});

	if (!usuario) res.status(400).json({errors: [{msg: 'Token no válido'}]});

	usuario.activo = true;
	usuario.token = null;

	await usuario.save();

	res.status(200).json({code: 200, msg: 'Cuenta activada correctamente'});
};

const solicitudResetPassword = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.json(errors);
	}

	const {email} = req.body;

	let usuario = await Usuarios.findOne({email});

	if (!usuario) res.status(400).json({errors: [{msg: 'Email no registrado'}]});

	const token = crypto.randomBytes(10).toString('hex');
	usuario.token = token;
	usuario.tokenExpiracion = Date.now() + 3600000;

	await usuario.save();

	const url = `${process.env.FRONTEND_URL}/reset-password/${token}`;

	enviarEmail({
		usuario,
		subject: 'Solicitud reset password LETA-Tasks',
		archivo: 'resetPassword',
		url,
	});

	res.status(200).json({code: 200, msg: 'se envió un correo con la url de reset'});
};

const validarTokenResetPassword = async (req, res) => {
	const {token} = req.params;

	let usuario = await Usuarios.findOne({token, tokenExpiracion: {$gte: Date.now()}});

	if (!usuario) res.status(400).json({errors: [{msg: 'token no válido'}]});

	res.status(200).json({code: 200, msg: 'ok'});
};

const guardarNuevoPassword = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.json(errors);
	}

	const {token} = req.params;

	let usuario = await Usuarios.findOne({token});

	if (!usuario) res.status(400).json({errors: [{msg: 'token no válido'}]});

	usuario.password = await bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
	usuario.token = null;
	usuario.tokenExpiracion = null;

	await usuario.save();

	res.status(200).json({code: 200, msg: 'ok'});
};

export {crearCuenta, confirmarCuenta, solicitudResetPassword, validarTokenResetPassword, guardarNuevoPassword};
