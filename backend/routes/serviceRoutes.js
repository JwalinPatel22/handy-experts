const express = require("express");
const {
  getAllServices,
  getService,
} = require("../controllers/serviceControllers");
const router = express.Router();

router.get("/services", getAllServices);
router.get("/service/:id", getService);

module.exports = router;
