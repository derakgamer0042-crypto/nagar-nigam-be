import mongoose from "mongoose";

export const connectDB = async () => {
	try {
		const uri = process.env.MONGO_URI;
		
		if (!uri) {
			throw new Error("MONGO_URI environment variable is not defined");
		}

		await mongoose.connect(uri);
		console.log("[Info] Successfully established connection with database");
		
		// Handle connection events
		mongoose.connection.on('error', (err) => {
			console.error("[DB Error]", err.message);
		});

		mongoose.connection.on('disconnected', () => {
			console.warn("[DB Warning] Database disconnected");
		});

	} catch (err) {
		console.error("[Error] while connecting to the DB:", err.message);
		throw err;
	}
};