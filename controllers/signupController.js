
const bcrypt = require('bcrypt');
const adminModel = require('../models/adminModel');

module.exports.openSignupPage = (req,res)=>{
    return res.render("./pages/signup");
}

module.exports.submitFormOnSignupPage = async(req,res)=>{
    const{username,password} = req.body;
    try {
        const admin = await adminModel.findOne({username});
        if(!admin){
            const hashedPassword = await bcrypt.hash(password,10);
            const newAdmin = new adminModel({username,password: hashedPassword});
            await adminModel.create(newAdmin);
            return res.redirect("/login");
        }
    } catch (error) {
        console.log(error);
        return res.render("./pages/signup",{error: "Something went wrong"});
    }
}
