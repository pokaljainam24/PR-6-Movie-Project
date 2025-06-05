const express = require('express');
const db = require('./configs/database');
const adminAuth = require("./middlewares/adminAuth");
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');
const cookieParser = require('cookie-parser');
const Movie = require('./models/movieModel');
const nodemailer = require('nodemailer');

const port = 8055;
const app = express();
db();

// Set view engine
app.set('view engine', 'ejs');

// Middleware setup (in correct order)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("public"));
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


// Send Mail
app.post('/send', (req, res) => {
    const { name, email, website, message } = req.body;

    // Email configuration
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'jainampokal@gmail.com',
            pass: 'ioyn wzzz rucp wlfw',         
        },
    });

    const mailOptions = {
        from: `<${email}> Movies Contact..🎥📽️`,
        to: 'pokaljainam@gmail.com',         
        subject: `Message from ${name}`,
        html: `<p><strong>Name:</strong> ${name}</p>
           <p><strong>Email:</strong> ${email}</p>
           <p><strong>Website:</strong> ${website}</p>
           <p><strong>Message:</strong><br>${message}</p>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.send('Error sending message.');
        }
        return res.redirect('/');
    });
});

// Start server
app.listen(port, () => {
    console.log('Server started successfully...');
    console.log(`http://localhost:${port}`);
});
