import bcrypt from 'bcrypt-nodejs';
import Usuarios from '../models/Usuarios.js';
import {validationResult} from 'express-validator';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config({path: 'variables.env'});

const iniciarSesion = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) res.status(400).json(errors);

	const {email, password} = req.body;

	try {
		const usuario = await Usuarios.findOne({email});

		if (!usuario) res.status(401).json({errors: [{msg: 'Usuario no registrado'}]});

		const validacionPassword = bcrypt.compareSync(password, usuario.password);

		if (!validacionPassword) res.status(401).json({errors: [{msg: 'Password incorrecto'}]});

		const payload = {
			usuario: {
				nombre: usuario.nombre,
				id: usuario.id,
				email: usuario.email,
			},
		};

		jwt.sign(payload, process.env.SECRET_STRING, {expiresIn: 3600}, (error, token) => {
			if (error) throw error;
			res.json({token});
		});
	} catch (error) {
		console.log(error);
	}
};

export {iniciarSesion};
