const express = require("express");
const path = require("path");
const { redirectToUrl } = require("../controllers/linkController");

const router = express.Router();

// Serve /code/:code page (React will handle UI)
router.get("/code/:code", (req, res) => {
  res.sendFile(path.join(process.cwd(), "frontend", "build", "index.html"));
});

// Redirect handler
router.get("/:code", redirectToUrl);

module.exports = router;
