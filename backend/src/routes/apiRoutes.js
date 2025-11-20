const express = require("express");
const {
  createLink,
  getAllLinks,
  getLinkStats,
  deleteLink
} = require("../controllers/linkController");

const router = express.Router();

router.post("/links", createLink);
router.get("/links", getAllLinks);
router.get("/links/:code", getLinkStats);
router.delete("/links/:code", deleteLink);

module.exports = router;
