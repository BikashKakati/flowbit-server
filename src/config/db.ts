import mongoose from 'mongoose';

export const connectDB = async (uri: string, dbName: string) => {
    try {
        const connectionResponse = await mongoose.connect(uri, {
            dbName: dbName,
        });
        console.log(`Successfully connected to MongoDB database: ${connectionResponse.connection.name}`);
    } catch (error) {
        console.error('Error: Failed to connect to MongoDB.', error);
        process.exit(1);
    }
};
