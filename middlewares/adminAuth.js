const adminAuth = (req, res, next) => {
    // console.log(req.cookies);
    const { admin } = req.cookies; 
    if(admin){
        return next();
    }

    return res.redirect("/login");
}

module.exports = adminAuth;