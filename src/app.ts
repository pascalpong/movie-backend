import fastify from 'fastify';
import dotenv from 'dotenv';
dotenv.config();
import cors from '@fastify/cors';
import movieRoutes from './routes/movie.route';
import authRoutes from './routes/user.route'
import mongoose from 'mongoose';


const app = fastify({ logger: true });

app.register(cors, {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
});

// Connect to MongoDB
const connectToDatabase = async () => {
    try {
        await mongoose.connect(`${process.env.MONGO_URL}`, {});
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('MongoDB connection error:', error);
    }
};

connectToDatabase();

// Register routes
app.register(movieRoutes);
app.register(authRoutes)

export default app;
