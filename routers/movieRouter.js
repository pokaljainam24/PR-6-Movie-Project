const { Router } = require("express");
const movieController = require("../controllers/movieController");
const upload = require("../middlewares/multerMiddleware");
const adminAuth = require("../middlewares/adminAuth");

const movieRouter = Router();
movieRouter.use(adminAuth);

// Admin Panel Routes
movieRouter.get("/", movieController.clientHome);
movieRouter.get("/admin", movieController.homePage);
movieRouter.get("/add-movie", movieController.addMoviePage);
movieRouter.post("/add-movie", upload, movieController.addMovie);
movieRouter.get("/view", movieController.view);
// Route for About Page
movieRouter.get("/about", movieController.aboutPage);
movieRouter.get("/review", movieController.reviewPage);
movieRouter.get("/single", movieController.singlePage);

// Movie Operations
movieRouter.get("/delete/:id", movieController.delete);
movieRouter.get("/edit/:id", movieController.edit);
movieRouter.post("/update/:id", upload, movieController.update);

module.exports = movieRouter;
