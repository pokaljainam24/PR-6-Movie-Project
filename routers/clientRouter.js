const express = require("express");
const clientRouter = express.Router();
const clientController = require("../controllers/clientController"); // Ensure this path is correct

// Define routes
clientRouter.get("/", clientController.clientHome);
clientRouter.get("/about", clientController.aboutPage);
clientRouter.get("/review", clientController.reviewPage);
clientRouter.get("/single/:id", clientController.singlePage);
clientRouter.get("/joinus",clientController.joinusPage);
clientRouter.get("/contact",clientController.contactPage);

module.exports = clientRouter;
