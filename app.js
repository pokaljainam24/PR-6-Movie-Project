const express = require('express');
const db = require('./configs/database');
const adminAuth = require("./middlewares/adminAuth");
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');
const cookieParser = require('cookie-parser');
const Movie = require('./models/movieModel');

const port = 8055;
const app = express();
db();

// Set view engine
app.set('view engine', 'ejs');

// Middleware setup (in correct order)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use("/uploads", express.static(path.join(__dirname, '/uploads')));


// Routes
const signupRoute = require("./routers/signupRouter");
app.use(signupRoute);

const loginRoute = require("./routers/loginRouter");
app.use(loginRoute);

const clientRouter = require("./routers/clientRouter");
app.use(clientRouter);

// admin router
const adminRouter = require("./routers/adminRouter");
app.use("/", adminRouter);

// About page
app.get("/about", (req, res) => {
    res.render("pages/about", { movies: [] });
});

// Single page
app.get('/single', (req, res) => {
    res.render('pages/single');
});

// Start server
app.listen(port, () => {
    console.log('Server started successfully...');
    console.log(`http://localhost:${port}`);
});
