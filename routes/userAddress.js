// routes/me_addresses.js
const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/auth");
const ctrl = require("../controllers/useraddresses");

router.use(verifyToken);
router.get("/", ctrl.list);
router.post("/", ctrl.create);
router.put("/:id", ctrl.update);
router.delete("/:id", async (req, res) => {
  const userId = req.user.id, id = req.params.id;
  const addr = await prisma.userAddress.findUnique({ where: { id } });
  if (!addr || addr.userId !== userId) return res.status(404).json({ error: "Not found" });
  await prisma.userAddress.delete({ where: { id } });
  res.status(204).send();
});
router.put("/:id/defaults", ctrl.setDefault);

module.exports = router;
