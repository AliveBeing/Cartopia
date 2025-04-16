import cookieParser from 'cookie-parser';
import express from 'express'
import cors from 'cors'
import connectDB from './configs/db.js';
import 'dotenv/config';
import userRouter from './routes/userRoute.js';
import sellerRouter from './routes/sellerRoute.js';
import connectCloudinary from './configs/cloudinary.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import addressRouter from './routes/addressRoute.js';
import orderRouter from './routes/orderRoute.js';


const app = express(); // create a new app instance

const port = process.env.PORT || 3001; 


await connectDB();
await connectCloudinary();

//allow multiple origins
const allowedOrigins=['http://localhost:5173']


//Middleware configuration
app.use(express.json())
app.use(cors({origin: allowedOrigins, credentials: true}));
app.use(cookieParser())



//define a simple route 

app.get('/',(req,res) => {

    res.send('API is working')
})

app.use('/api/user', userRouter)
app.use('/api/seller', sellerRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/address', addressRouter)
app.use('/api/order', orderRouter)


app.listen(port, () => {
    console.log(`server running on http://localhost:${port}`)
})