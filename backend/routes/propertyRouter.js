const express = require("express");
const {
    getAllProperty,
    getPropertyById,
    createProperty,
    updateProperty,
    deleteProperty,
} = require("../controllers/propertyControllers");

const router = express.Router();

router.get("/", getAllJobs);
router.post("/", createJob);
router.get("/:propertyId", getPropertyById);
router.put("/:propertyId", updateProperty);
router.delete("/:propertyId", deleteProperty);

module.exports = router;