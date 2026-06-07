import mongoose from 'mongoose';

export const connectDB = async (uri: string, dbName: string) => {
    if (mongoose.connection.readyState === 1) {
        return mongoose.connection;
    }
    try {
        const connectionResponse = await mongoose.connect(uri, {
            dbName: dbName,
        });
        console.log(`Successfully connected to MongoDB database: ${connectionResponse.connection.name}`);
        return connectionResponse;
    } catch (error) {
        console.error('Error: Failed to connect to MongoDB.', error);
        throw error;
    }
};
