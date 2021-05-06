import mongoose from 'mongoose';

const tareaSchema = mongoose.Schema({
	titulo: {
		type: String,
		required: true,
		trim: true,
	},
	descripcion: {
		type: String,
		trim: true,
	},
	proyectoId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Proyectos',
	},
	completa: {
		type: Boolean,
		default: false,
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	},
});

export default mongoose.model('Tareas', tareaSchema);
