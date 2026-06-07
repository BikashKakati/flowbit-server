import 'dotenv/config';
import { connectDB } from './config/db';
import app from './app';
import { DB_DETAILS } from './constant';
import serverless from 'serverless-http';

const { DB_URI, DB_NAME } = DB_DETAILS;

const serverlessHandler = serverless(app);

export const handler = async (event: any, context: any) => {
    // AWS Lambda optimization: prevent hanging on open MongoDB sockets
    context.callbackWaitsForEmptyEventLoop = false;

    // Establish/reuse database connection
    await connectDB(DB_URI, DB_NAME);

    // Handle standard API Gateway/ALB proxy event
    return serverlessHandler(event, context);
};
