import 'dotenv/config';
import { connectDB } from './config/db';
import app from './app';
import { DB_DETAILS } from './constant';

const PORT = process.env.SERVER_PORT || 4000;
const { DB_URI, DB_NAME } = DB_DETAILS;

connectDB(DB_URI, DB_NAME).then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});