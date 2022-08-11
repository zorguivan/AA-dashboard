const db = require("../models");
const creditCards = db.creditCards;
const User = require("../models/Users");

// Create and Save a new Credit Card
exports.create = async (req, res) => {
    const creditCard = new creditCards({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        cardNumber: req.body.cardNumber,
        verificationValue: req.body.verificationValue,
        month: req.body.month,
        year: req.body.year,
        user: req.body.user,
    });
    await creditCard.save();
    await User.findOneAndUpdate({ _id: req.body.user }, { $push: { creditCards: creditCard._id } });
    res.send("Credit Card was added successfully");
};

// Retrieve all Credit Cards from the database.
exports.findAll = (req, res) => {
    creditCards.find()
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving credit cards.",
            });
        });
};

// Find a single Credit Card with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
    creditCards.findById(id)
        .then((data) => {
            if (!data)
                res.status(404).send({ message: "No Credit Card found with id " + id });
            else res.send(data);
        })
        .catch((err) => {
            res.status(500).send({ message: "Error retrieving Credit Card with id=" + id });
        });
};

// Delete a Credit Card with the specified id in the request
exports.delete = async (req, res) => {
    const id = req.params.id;
    const idUser = await creditCards.findById(id, 'user').exec()
    await creditCards.findByIdAndRemove(id);
    await User.findOneAndUpdate({ _id: idUser.user }, { $pullAll: { creditCards: [{ _id: id }] } });
    res.send("CC was deleted successfully");
};

// Update a CC by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    creditCards.findByIdAndUpdate(id,
        {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            cardNumber: req.body.cardNumber,
            verificationValue: req.body.verificationValue,
            month: req.body.month,
            year: req.body.year,
        })
        .then((data) => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update CC with id=${id}. Maybe CC was not found!`,
                });
            } else
                res.send({ message: "CC was updated successfully." });
        })
        .catch((err) => {
            res.status(500).send({
                message: "Error updating CC with id=" + id,
            });
        });
}; 