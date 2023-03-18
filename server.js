import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from './config/db.js';
import authRoute from './routers/authRoute.js';
import productRoutes from './routers/productRoutes.js';
import cors from 'cors';
import categoryRoutes from './routers/categoryRoutes.js';
import path from 'path';

//configure env
dotenv.config();

//database config
connectDB();

//rest object
const app= express()

//middleware
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, './client/build')))

//routes
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/category', categoryRoutes);
app.use('/api/v1/product', productRoutes);


//rest api
app.use('*', function(req,res){
       res.sendFile(path.join(__dirname, './client/build/index.html'))
});

//port
const PORT =process.env.PORT || 8080 ;

//run listen the app
app.listen(PORT, ()=>{
    console.log(`Server is running on ${process.env.DEV_MODE} mode on port ${PORT}`);

})