const movieModel = require('../models/movieModel');
const Movie = require("../models/movieModel"); // Adjust path if needed

module.exports.homePage = async (req, res) => {
    try {
        const movies = await Movie.find(); // Fetch movies from database
        res.render("index", { movies }); // Pass movies to EJS
    } catch (error) {
        console.error("Error fetching movies:", error);
        res.status(500).send("Server Error");
    }
};

exports.clientHome = async (req, res) => {
    try {
        const movies = await Movie.find(); // Fetch movies from the database
        console.log("Movies fetched:", movies); // Debugging log

        res.render("pages/clientHome", { movies }); // Pass movies to EJS
    } catch (error) {
        console.error("Error fetching movies:", error);
        res.status(500).send("Error fetching movies");
    }
};

exports.aboutPage = async (req, res) => {
    try {
        const movies = await Movie.find(); // Fetch all movies from MongoDB
        res.render("pages/about", { movies }); // Pass movies array to EJS
    } catch (error) {
        console.error("Error fetching movies:", error);
        res.status(500).send("Internal Server Error");
    }
};

exports.reviewPage = async (req, res) => {
    try {
        const movies = await Movie.find();
        res.render("pages/review", { movies }); // Fix: Include "pages/"
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
};


exports.singlePage = async (req, res) => {
    const { id } = req.params;
    try {
        const movie = await Movie.findById(id);
        if (!movie) {
            return res.status(404).send("Movie not found");
        }
        return res.render("./pages/single.ejs", { movie });
    } catch (error) {
        console.error("Error fetching movie:", error);
        res.status(500).send("Error fetching movie");
    }
}

module.exports.addMoviePage = (req, res) => {
    return res.render('./pages/add-movie.ejs');
}

module.exports.addMovie = async (req, res) => {
    console.log(req.body);

    try {
        await movieModel.create({ ...req.body, thumbnail: req.file.filename });
        console.log('Movie added successfully');
        return res.redirect('/admin');
    } catch (error) {
        console.log(error.message);
        return res.redirect('/add-movie');
    }
};

module.exports.view = async (req, res) => {
    try {
        const movies = await movieModel.find();
        return res.render('./pages/view.ejs', { movies });
    } catch (error) {
        console.log(error.message);
        return res.render('./pages/view.ejs', { movies: {} });
    }
};

module.exports.delete = async (req, res) => {
    try {
        const { id } = req.params;
        await movieModel.findByIdAndDelete(id);
        return res.redirect('/view');
    } catch (error) {
        console.log(error.message);
        return res.redirect('/view');
    }
};

module.exports.edit = async (req, res) => {
    try {
        const { id } = req.params;
        const movie = await movieModel.findById(id);

        if (!movie) {
            console.log('Movie not found');
            return res.render('./pages/edit.ejs', { movie: {} });
        }

        return res.render('./pages/edit.ejs', { movie });
    } catch (error) {
        console.log(error.message);
        return res.render('./pages/edit.ejs', { movie: {} });
    }
};


module.exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        let update = { ...req.body };

        if (req.file) {
            update.thumbnail = req.file.filename;
        }

        await movieModel.findByIdAndUpdate(id, update);
        console.log('Movie updated successfully');
        return res.redirect('/admin');  // Redirecting to the dashboard after update
    } catch (error) {
        console.log(error.message);
        return res.redirect('/view');  // Or handle errors properly
    }
};

module.exports.openSinglePage = async (req, res) => {
    console.log(req.params);
    const { id } = req.params;
    try {
        const movie = await movieModel.findById(id);
        return res.render("pages/single", { movie });
    } catch (error) {
        console.log(error.message);
        return res.render("./pages/single", { movie: {} });
    }
}

module.exports.logout = (req, res) => {
    res.clearCookie('userId'); // No need to pass 'id'
    return res.redirect('/login'); // Redirect to login page
};
