const express = require("express");
const router = express.Router();
const upload = require("../middlewares/multerMiddleware");
const adminController = require("../controllers/adminController");
const adminAuth = require("../middlewares/adminAuth");

router.use(adminAuth);

// Admin Panel Routes
router.get("/admin", adminController.homePage); 
router.get("/add-movie", adminController.addMoviePage);
router.post("/add-movie", upload, adminController.addMovie);
router.get("/view", adminController.view);

// Movie Operations
router.get("/delete/:id", adminController.delete);
router.get("/edit/:id", adminController.edit);
router.post("/update/:id", upload, adminController.update);

module.exports = router;
