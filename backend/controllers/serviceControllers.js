const Service = require("../models/Service");

const getAllServices = async function (req, res) {
  const allServices = await Service.find({});
  res.json(allServices);
};

const getService = async function (req, res) {
  try {
    const service = await Service.findById(req.params.id);
    res.json(service);
  } catch (error) {
    res.status(500).json({ error: "Error getting serviceService" });
  }
};

const createService = async function (req, res) {
  const { title, type, description, cost, availability } = req.body;
  const newService = new Service({
    title,
    type,
    description,
    cost,
    availability,
  });

  try {
    await newService.save();
  } catch (error) {
    console.log("Error creating service: ", error);
  }
};

module.exports = {
  getAllServices,
  getService,
  createService,
};
