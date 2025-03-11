import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import ConnectDb from './lib/Db.js';
import cors from 'cors';
import AuthRouter from './router/UserAuth.router.js';

const app = express();
app.use(express.json());
app.use(cookieParser());
dotenv.config();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["POST", "GET", "PUT", "DELETE"],
    allowedHeaders: [
        "Content-Type",
        "Authorization",
        "Cache-Control",
        "Expires",
        "Pragma",
    ],
    credentials: true
}));

// Routes
app.use('/api/auth', AuthRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

// Connect to the database and start the server
const startServer = async () => {
    try {
        await ConnectDb(); // Ensure this function connects to your database
        app.listen(PORT, () => {
            console.log(`The server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Failed to connect to the database:", error);
        process.exit(1); // Exit the process with failure
    }
};

startServer();