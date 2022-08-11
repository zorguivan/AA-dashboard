module.exports = (app) => {
    const creditCards = require("../controllers/creditCards.controller.js");
  
    var router = require("express").Router();
  
    // Create a new creditCard
    router.post("/", creditCards.create);
  
    // Retrieve all creditCard
    router.get("/", creditCards.findAll);
  
    // Retrieve a single creditCard with id
    router.get("/:id", creditCards.findOne);
  
    // Delete a single creditCard with id
    router.delete("/:id", creditCards.delete);
  
    // Update a creditCard with id
    router.put("/:id", creditCards.update);
  
    app.use("/api/creditCard", router);
  };