const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");
const ctrl = require("../controllers/userprofiles");

router.use(verifyToken);

router.get("/", ctrl.getProfile);
router.post("/", ctrl.upsertProfile); // can also be PUT

module.exports = router;
