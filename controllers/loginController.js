const bcrypt = require("bcrypt");
const adminModel = require("../models/adminModel");
module.exports.openLoginPage = (req,res)=>{
    return res.render("./pages/login");
}

module.exports.submitFormOnLoginPage = async(req,res)=>{
    const{username,password} = req.body;
    try{
        const admin = await adminModel.findOne({username});
        if(admin){
            const isValid = await bcrypt.compare(password,admin.password);
            if(isValid){
                res.cookie("admin",admin.id);
                return res.redirect("/admin");
            }
        }
    }catch(err){
        console.log(err.message);
        return res.redirect("/admin");
    }
}