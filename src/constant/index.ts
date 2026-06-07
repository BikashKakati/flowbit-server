export const DB_DETAILS: { DB_URI: string, DB_NAME: string } = {
    DB_URI: process.env.MONGO_URI!,
    DB_NAME: process.env.MONGO_DB_NAME || 'flowsbit'
}