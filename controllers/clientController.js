const Movie = require("../models/movieModel")


module.exports.clientHome = async (req, res) => {
    try {
        const movies = await Movie.find();
        console.log("Movies fetched:", movies);

        res.render("pages/clientHome", { movies });
    } catch (error) {
        console.error("Error fetching movies:", error);
    }
};


module.exports.aboutPage = async (req, res) => {
    try {
        const movies = await Movie.find();
        res.render("pages/about", { movies });
    } catch (error) {
        console.error("Error fetching movies:", error);
    }
};

module.exports.reviewPage = async (req, res) => {
    try {
        const movies = await Movie.find();
        res.render("pages/review", { movies });
    } catch (error) {
        console.error(error);
    }
};


module.exports.singlePage = async (req, res) => {
    const { id } = req.params;
    try {
        const movie = await Movie.findById(id);
        if (!movie) {
            return res.status(404).send("Movie not found");
        }
        return res.render("./pages/single.ejs", { movie });
    } catch (error) {
        console.error("Error fetching movie:", error);
    }
}

module.exports.joinusPage = (req, res) => {
    return res.render("./pages/joinus")
}

module.exports.contactPage = (req, res) => {
    return res.render("./pages/contact")
}