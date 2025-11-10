import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const MONGODB_DB = process.env.MONGODB_DB || 'reuscons';

let isConnected = false;

export async function connectToDatabase() {
	if (isConnected) {
		return mongoose.connection;
	}

	try {
		const connection = await mongoose.connect(`${MONGODB_URI}/${MONGODB_DB}`, {
			retryWrites: true,
			w: 'majority'
		});

		isConnected = true;
		console.log(`✅ Conectado a MongoDB Mongoose: ${MONGODB_DB}`);

		return connection;
	} catch (error) {
		console.error('❌ Error conectando a MongoDB:', error);
		throw error;
	}
}

export async function disconnectFromDatabase() {
	if (isConnected) {
		await mongoose.disconnect();
		isConnected = false;
		console.log('✅ Desconectado de MongoDB');
	}
}

export function getDatabase() {
	if (!isConnected) {
		throw new Error('Base de datos no inicializada. Llama a connectToDatabase() primero');
	}
	return mongoose.connection;
}

export default mongoose;
