const adminModel = require("../models/adminModel");
const bcrypt = require("bcrypt");


module.exports.loginPage = (req,res)=>{
    return res.render("./pages/login");
}

module.exports.loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const admin = await adminModel.findOne({ username });

        if (admin) {
            const isValid = await bcrypt.compare(password, admin.password);
            if (isValid) {
                res.cookie("admin", admin.id); 
                return res.redirect("/admin"); 
            }
        }

        res.redirect("/login"); 
    } catch (err) {
        console.log(err.message);
        res.redirect("/login");
    }
};