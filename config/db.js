import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({path: 'variables.env'});

const conectarBD = async () => {
	try {
		await mongoose.connect(process.env.DB_MONGO, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: false,
		});
		console.log('base de datos conectada');
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};

export default conectarBD;
