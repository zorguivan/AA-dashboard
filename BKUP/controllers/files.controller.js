const db = require("../models");
const mongoose = require('mongoose');
const Files = db.files;
const User = require("../models/Users");

exports.create = async (req, res) => {
  const url = req.protocol + '://' + req.get('host')
  const file = new Files({
    _id: new mongoose.Types.ObjectId(),
    name: url + '/' + req.file.filename,
    user: req.body.user,
  })
  await file.save();
  console.log(file)
  await User.findOneAndUpdate({ _id: req.body.user }, { $push: { files: file._id } });
  res.send("File was added successfully");
};

exports.findAll = async (req, res) => {
  try {
    const files = await File.find();
    res.status(200).json({
      status: "success",
      files,
    });
  } catch (error) {
    res.json({
      status: "Fail",
      error,
    });
  }
  ;
};

// Delete a File with the specified id in the request
exports.delete = async (req, res) => {
  const id = req.params.id;
  const idUser = await Files.findById(id, 'user').exec()
  await Files.findByIdAndRemove(id);
  await User.findOneAndUpdate({ _id: idUser.user }, { $pullAll: { files: [{ _id: id }] } });
  res.send("File was deleted successfully");
};