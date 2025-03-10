const Property = require("../models/propertyModel");
const mongoose = require("mongoose");

//GET / properties;
const getAllProperty = async (req, res) => {
  try {
    const properties = await Property.find({}).sort({ createdAt: -1 });
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve properties" });
  }
};

// POST /properties
const createProperty = async (req, res) => {
  try {
    const newProperty = await Property.create({ ...req.body });
    res.status(201).json(newProperty);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to create property", error: error.message });
  }
};

// GET /properties/:propertyId
const getPropertyById = async (req, res) => {
  res.send("getPropertyById");
};

// PUT /property/:propertyId
const updateProperty = async (req, res) => {
  res.send("updateProperty");
};

// DELETE /properties/:propertyId
const deleteProperty = async (req, res) => {
  res.send("deleteProperty");
};

module.exports = {
  getAllProperty,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
};