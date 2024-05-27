const express = require("express");
const app = express();
const cors = require('cors'); 
const { connect } = require("./config/database");
const { login, signup } = require("./controllers/Auth");
const { auth, isCustomer, isDriver } = require("./Middlewares/auth");
const { createRide, getCurrentRide, acceptRide, completeRide, getRideHistory, getAvailableRides } = require("./controllers/Ride");
require("dotenv").config();

const port = process.env.PORT || 4000;


app.use(express.json());
app.use(cors());

// Public Routes
app.post("/login", login);
app.post("/signup", signup);

// Protected Routes
app.get('/home', auth, (req, res) => {
  res.send("Welcome to Home Page");
});

app.post('/rides', auth, isCustomer, createRide);
app.get('/rides/current', auth, isCustomer, getCurrentRide);

app.get('/rides/pending', auth, isDriver, (req, res, next) => {
  //console.log('GET /rides/pending route hit');
  next();
}, getAvailableRides);
// app.get('/rides/current/driver', auth, isDriver, getCurrentRideForDriver);
// app.get('/rides/pending', auth, isDriver, getAvailableRides); 
app.patch('/rides/:id/accept', auth, isDriver, acceptRide);
app.patch('/rides/:id/complete', auth, isDriver, completeRide);

app.get('/rides/history', auth, getRideHistory); 

connect();

app.listen(port, () => {
  console.log(`App listening at port ${port}`);
});
