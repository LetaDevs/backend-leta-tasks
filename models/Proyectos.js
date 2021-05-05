import mongoose from 'mongoose';

const proyectoSchema = mongoose.Schema({
	titulo: {
		type: String,
		required: true,
		trim: true,
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	},
	url: {
		type: String,
		required: true,
		trim: true,
	},
	usuarioId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Usuarios',
	},
});

export default mongoose.model('Proyectos', proyectoSchema);
