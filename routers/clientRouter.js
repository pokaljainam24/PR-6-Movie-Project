const express = require("express");
const router = express.Router();

router.get("/clientHome", (req, res) => {
    const { username, password } = req.query;

    if (!username || !password) {
        return res.redirect("/login"); // Redirect if no credentials provided
    }

    res.render("clientHome", { username }); // Render home page with username
});

module.exports = router;
