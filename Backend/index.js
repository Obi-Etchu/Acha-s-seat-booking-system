import cors from 'cors'
import express from "express";
import dotenv from 'dotenv'
import userRoutes from './src/routes/userRoutes.js'

dotenv.config();

const app = express()
const PORT = process.env.PORT || 3002;

// Middleware
app.use(express.json()); 
app.use(cors());

//Routes
app.use('/api/users', userRoutes)
app.get('/', (req, res) => {
    res.status(200).send('This is Obi testing');
});

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT} \n access it at http://localhost:${PORT}`)
})