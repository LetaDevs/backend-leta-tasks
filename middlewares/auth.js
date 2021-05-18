import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
	const token = req.header('x-auth-token');

	if (!token) return res.status(401).json({errors: [{msg: 'Un token es necesario'}]});

	try {
		const cifrado = jwt.verify(token, process.env.SECRET_STRING);
		req.usuario = cifrado.usuario;
		next();
	} catch (error) {
		return res.status(401).json({errors: [{msg: 'no tienes permiso para realizar la solicitud'}]});
	}
};

export default auth;
