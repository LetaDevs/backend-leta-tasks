import mongoose from 'mongoose';

const usuariosSchema = mongoose.Schema({
	nombre: {
		type: String,
		required: true,
		trim: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	activo: {
		type: Boolean,
		default: false,
	},
	token: {
		type: String,
		default: null,
	},
	tokenExpiracion: {
		type: Date,
		default: null,
	},
});

export default mongoose.model('Usuarios', usuariosSchema);
