module.exports = (app) => {
    const services = require("../controllers/services.controller.js");

    var router = require("express").Router();

    // Create a new service
    router.post("/", services.create);

    // Retrieve all services
    router.get("/", services.findAll);

    // Retrieve a single service with id
    router.get("/:id", services.findOne);

    // Delete a single service with id
    router.delete("/:id", services.delete);

    // Update a service with id
    router.put("/:id", services.update);

    // Create a new payment history
    router.put("/paymentHistory", services.createPaymentHistory);

    app.use("/api/services", router);
  };