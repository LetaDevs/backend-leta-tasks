import Tareas from '../models/Tareas.js';
import Proyectos from '../models/Proyectos.js';

const crearTarea = async (req, res) => {
	const {proyectoId} = req.query;

	try {
		const proyecto = await Proyectos.findById(proyectoId);

		if (proyecto.usuarioId != req.usuario.id) return res.status(403).json({errors: [{msg: 'Usuario no autorizado'}]});

		let tarea = new Tareas(req.body);
		tarea.proyectoId = proyecto._id;

		await tarea.save();

		res.status(201).json({code: 201, msg: 'tarea agregada correctamente'});
	} catch (error) {
		res.status(404).json({errors: [{msg: 'Proyecto no existente'}]});
	}
};

const editarTarea = async (req, res) => {
	const {tareaId} = req.params;

	try {
		let tarea = await Tareas.findById(tareaId);

		const proyectoTarea = await Proyectos.findById(tarea.proyectoId);

		if (proyectoTarea.usuarioId != req.usuario.id) return res.status(403).json({errors: [{msg: 'no autorizado'}]});

		tarea.titulo = req.body.titulo;
		tarea.descripcion = req.body.descripcion;

		await tarea.save();

		res.status(200).json({code: 200, msg: 'tarea actualizada correctamente'});
	} catch (error) {
		res.status(404).json({errors: [{msg: 'tarea no encontrada'}]});
	}
};

const eliminarTarea = async (req, res) => {
	const {tareaId} = req.params;

	try {
		let tarea = await Tareas.findById(tareaId);

		const proyecto = await Proyectos.findById(tarea.proyectoId);

		if (proyecto.usuarioId != req.usuario.id) return res.status(403).json({errors: [{msg: 'Usuario no autorizado'}]});

		await Tareas.deleteOne({_id: tareaId});

		res.status(200).json({code: 200, msg: 'tarea eliminada exitosamente'});
	} catch (error) {
		res.status(404).json({errors: [{msg: 'tarea no encontrada'}]});
	}
};

const cambiarEstadoTarea = async (req, res) => {
	const {tareaId} = req.params;

	try {
		let tarea = await Tareas.findById(tareaId);

		const proyecto = await Proyectos.findById(tarea.proyectoId);

		if (proyecto.usuarioId != req.usuario.id) return res.status(403).json({errors: [{msg: 'Usuario no autorizado'}]});

		let estado = false;
		if (tarea.completa === estado) {
			estado = true;
		}

		tarea.completa = estado;

		await tarea.save();
		res.status(200).json({code: 200, msg: 'ok'});
	} catch (error) {
		res.status(404).json({errors: [{msg: 'tarea no encontrada'}]});
	}
};

export {crearTarea, editarTarea, eliminarTarea, cambiarEstadoTarea};
