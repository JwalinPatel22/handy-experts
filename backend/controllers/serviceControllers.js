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

module.exports = {
  getAllServices,
  getService,
};
