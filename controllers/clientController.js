const Movie = require("../models/movieModel"); // Ensure correct model path

module.exports.homePage = async (req, res) => {
    try {
        const movies = await Movie.find({}); // Fetch movies from the database
        console.log("Movies fetched:", movies); // Debugging log
        res.render("pages/clientHome", { movies }); // Pass movies to EJS
    } catch (error) {
        console.error("Error fetching movies:", error);
        res.status(500).send("Internal Server Error");
    }
};
