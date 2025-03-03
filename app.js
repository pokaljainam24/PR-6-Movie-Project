const express = require('express');
const db = require('./configs/database');
const adminAuth = require("./middlewares/adminAuth");  // ✅ Import once
const movieRouter = require('./routers/movieRouter');
const bodyParser = require('body-parser');
const movieModel = require('./models/movieModel');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');
const cookieParser = require('cookie-parser');  // ✅ Correct import


const port = 8055;
const app = express();
db();

// Set view engine
app.set('view engine', 'ejs');

// Middleware setup
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, 'uploads')));
app.use("/movies", movieRouter); // Make sure this line is present      
app.use(cookieParser());

// Routes
const signupRoute = require("./routers/signupRouter");
app.use(signupRoute);

const loginRoute = require("./routers/loginRouter");
app.use(loginRoute);

const adminRoute = require("./routers/movieRouter");
app.use(adminRoute);  // ✅ `adminAuth` should be inside `movieRouter.js`

const userRoute = require("./routers/clientRouter");
app.use(userRoute);

// about page
app.get("/about", (req, res) => {
    res.render("pages/about", { movies: [] }); // Ensure movies is defined
});

// single page
app.get('/single', (req, res) => {
    res.render('pages/single'); // Make sure 'single.ejs' exists inside 'views/pages/'
});

// Start server
app.listen(port, () => {
    console.log('Server started successfully...');
    console.log(`http://localhost:${port}`);
});
