const movieModel = require("../models/movieModel");
const clientRouter = require("../routers/clientRouter");

module.exports.homePage = async (req, res) => {
    try {
        const movies = await movieModel.find();
        res.render("index", { movies });
    } catch (error) {
        console.error("Error fetching movies:", error);
    }
};


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
        return res.render('./pages/view.ejs', { movies: [] });
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
        return res.redirect('/admin');
    } catch (error) {
        console.log(error.message);
        return res.redirect('/view');
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
    res.clearCookie('userId');
    return res.redirect('/login');
};