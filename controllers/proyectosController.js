import Proyectos from '../models/Proyectos.js';
import slug from 'slug';
import shortid from 'shortid';

const crearProyecto = async (req, res) => {
	try {
		let proyecto = new Proyectos(req.body);
		proyecto.url = `${slug(req.body.titulo).toLowerCase()}-${shortid.generate()}`;
		proyecto.usuarioId = req.usuario.id;

		await proyecto.save();
		res.status(201).json({msg: 'proyecto agregado exitosamente'});
	} catch (error) {
		res.status(500).json({errors: [{msg: 'ocurrió un error'}]});
	}
};

const editarProyecto = async (req, res) => {
	const {proyectoId} = req.params;

	try {
		const proyecto = await Proyectos.findById(proyectoId);

		if (proyecto.usuarioId != req.usuario.id) {
			return res.status(403).json({errors: [{msg: 'No tienes permiso para realizar dicha acción'}]});
		}

		proyecto.titulo = req.body.titulo;

		await proyecto.save();
		res.status(200).json({msg: 'proyecto actualizado correctamente'});
	} catch (error) {
		res.status(404).json({errors: [{msg: 'proyecto no encontrado'}]});
	}
};

const eliminarProyecto = async (req, res) => {
	const {proyectoId} = req.params;

	try {
		const proyecto = await Proyectos.findById(proyectoId);

		if (proyecto.usuarioId != req.usuario.id) {
			return res.status(403).json({errors: [{msg: 'No tienes permiso para realizar dicha acción'}]});
		}

		await Proyectos.deleteOne({_id: proyectoId});

		res.status(200).json({msg: 'proyecto eliminado correctamente'});
	} catch (error) {
		res.status(404).json({errors: [{msg: 'Proyecto no encontrado'}]});
	}
};

const obtenerProyectos = async (req, res) => {
	const {usuarioId} = req.params;

	if (usuarioId != req.usuario.id) res.status(401).json({errors: [{msg: 'No autorizado'}]});

	const proyectos = await Proyectos.find({usuarioId});

	res.status(200).json(proyectos);
};

export {crearProyecto, editarProyecto, eliminarProyecto, obtenerProyectos};