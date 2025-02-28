const User = require("../models/movieModel"); // Import User model

module.exports.loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user || user.password !== password) {
            return res.status(400).send("Invalid credentials");
        }

        // Redirect based on user role
        if (user.role === "admin") {
            return res.redirect(`/adminPanel?role=admin&username=${user.username}`);
        } else {
            return res.redirect(`/clientHome?role=user&username=${user.username}`);
        }
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).send("Server error");
    }
};
