const express = require("express");
const { addService, getAllServices, DeleteService, findService, updateService, ContactService } = require("../controllers/Service");

const router = express.Router();

router.post("/addservice",addService);
router.get("/all",getAllServices);
router.delete("/:id",DeleteService);
router.get("/one/:id",findService);
router.put("/update/:id",updateService);
router.post("/contact",ContactService)

module.exports = router;