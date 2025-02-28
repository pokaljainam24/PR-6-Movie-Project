const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.get("/login", (req, res) => {
    return res.render("./pages/login");
});

router.post("/login", authController.loginUser);

module.exports = router;
