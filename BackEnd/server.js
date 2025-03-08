
import  express from 'express'
import cookieParser from 'cookie-parser'
import env from 'dotenv';
import ConnectDb from './lib/Db.js';
import cors from 'cors'
import AuthRouter from './router/UserAuth.router.js';
env.config();
const app=express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cookieParser())

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["POST", "GET", "PUT", "DELETE"],
    allowedHeaders: [ // Corrected spelling
        "Content-Type", // Corrected casing
        "Authorization",
        "Cache-Control", // Corrected spelling
        "Expires",
        "Pragma",
    ],
    credentials: true // Corrected spelling
}));
app.use('/api/auth',AuthRouter)
ConnectDb()
app.listen(PORT ,()=>{
     console.log("the server connect with port",PORT);
})

