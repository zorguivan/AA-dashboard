const db = require("../models");
const Services = db.services;
const User = require("../models/Users");

// Create and Save a new service
exports.create = async (req, res) => {
    const service = new Services({
        paymentType: req.body.paymentType,
        serviceName: req.body.serviceName,
        price: req.body.price,
        monthlyDate: req.body.monthlyDate,
        user: req.body.user,
        paymentHistory: req.body.paymentHistory
    });
    await service.save();
    await User.findOneAndUpdate({ _id: req.body.user }, { $push: { services: service._id } });
    res.send("services was added successfully");
};

// Retrieve all services from the database.
exports.findAll = (req, res) => {
    Services.find()
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving services.",
            });
        });
};

// Find a single service with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    Services.findById(id)
        .then((data) => {
            if (!data)
                res.status(404).send({ message: "No service found with id " + id });
            else res.send(data);
        })
        .catch((err) => {
            res.status(500).send({ message: "Error retrieving service with id=" + id });
        });
};

// Delete a service with the specified id in the request
exports.delete = async (req, res) => {
    const id = req.params.id;
    const idUser = await Services.findById(id, 'user').exec()
    await Services.findByIdAndRemove(id);
    await User.findOneAndUpdate({ _id: idUser.user }, { $pullAll: { services: [{ _id: id }] } });
    res.send("service was deleted successfully");
};

// Update a service by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    Services.findByIdAndUpdate(id,
        {
            paymentType: req.body.paymentType,
            serviceName: req.body.serviceName,
            price: req.body.price,
            monthlyDate: req.body.monthlyDate
        })
        .then((data) => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update service with id=${id}. Maybe service was not found!`,
                });
            } else
                res.send({ message: "service was updated successfully." });
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error updating service with id=" + id,
            });
        });
};

// Create and Save a new payment history
exports.createPaymentHistory = async (req, res) => {
    const paymentHistory = new Array({
        paymentValue: req.body.paymentValue,
        paymentDate: req.body.paymentDate,
        service: req.body.service,
        paymentMethod: req.body.paymentMethod
    });

    await Services.findOneAndUpdate({ _id: req.body.service }, { $push: { paymentHistory: paymentHistory } });
    res.send("Payment history was added successfully");
}; 