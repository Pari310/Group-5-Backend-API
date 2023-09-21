const express = require("express");
const mongoose = require('mongoose')
const app = express();
const Car = require('./models/carModel')

app.use(express.json())

// Retrieve all the data in the database
app.get('/cars', async(req, res) => {
    try {
        const cars = await Car.find({});
        res.status(200).json(cars);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


// Retrieve the data from the database using id
app.get('/cars/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const car = await Car.findById(id);
        res.status(200).json(car);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


// Push new data in the databse
app.post('/cars', async(req, res) => {
    try {
        const car = await Car.create(req.body)
        res.status(200).json(car);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})


// Update the data in the database 
app.put('/cars/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const car = await Car.findByIdAndUpdate(id, req.body);
        // we cannot find any product in database
        if(!car){
            return res.status(404).json({message: `cannot find any car with ID ${id}`})
        }
        const updatedCar = await Car.findById(id);
        res.status(200).json(updatedCar);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


// Delete the data from database
app.delete('/cars/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const car = await Car.findByIdAndDelete(id);
        if(!car){
            return res.status(404).json({message: `cannot find any product with ID ${id}`})
        }
        res.status(200).json(car);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


// MongoDB connection
mongoose.set("strictQuery", false)
mongoose.
connect('mongodb+srv://s222195895:Pari3101@cluster0.b2d5g8x.mongodb.net/?retryWrites=true&w=majority')
.then(() => {
    console.log('connected to MongoDB')
    app.listen(5000, ()=> {
        console.log(`Node API app is running on port 5000`)
    });
}).catch((error) => {
    console.log(error)
})