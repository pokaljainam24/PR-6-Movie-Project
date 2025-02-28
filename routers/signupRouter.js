const express = require("express");
const router = express.Router();
const signupController = require('../controllers/signupController'); 

//-1 open signup page
router.get("/signup",signupController.openSignupPage);

//-2 submit form on signup page
router.post("/signup", signupController.submitFormOnSignupPage);

module.exports = router;