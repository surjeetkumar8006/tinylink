const Link = require("../models/Link");
const { isValidCode, isValidUrl, generateCode } = require("../utils/validators");

/* 
  Create a new short link
  Supports:
  - Auto generated codes
  - Custom codes
  - URL validation
  - Unique code check
*/
exports.createLink = async (req, res) => {
  try {
    const { target, code: customCode } = req.body;

    if (!target || !isValidUrl(target)) {
      return res.status(400).json({ error: "Invalid URL. Must start with http or https." });
    }

    let code = customCode;

    // If user provides custom short code
    if (customCode) {
      if (!isValidCode(customCode)) {
        return res
          .status(400)
          .json({ error: "Custom code must be alphanumeric and 6–8 characters long." });
      }

      const exists = await Link.findOne({ code: customCode });
      if (exists) {
        return res.status(409).json({ error: "This custom code is already taken." });
      }
    }

    // Auto-generate code if not provided
    if (!customCode) {
      let unique = false;

      while (!unique) {
        const generated = generateCode(6);
        const exists = await Link.findOne({ code: generated });

        if (!exists) {
          code = generated;
          unique = true;
        }
      }
    }

    // Create link entry
    const newLink = await Link.create({ code, target });

    return res.status(201).json({
      code,
      target,
      short_url: `${process.env.BASE_URL}/${code}`,
      clicks: newLink.clicks,
      created_at: newLink.created_at
    });

  } catch (err) {
    console.error("Create Link Error:", err);

    if (err.code === 11000) {
      return res.status(409).json({ error: "A link with this code already exists." });
    }

    return res.status(500).json({ error: "Internal server error." });
  }
};


/* 
  Get all links
  Sorted by newest first
*/
exports.getAllLinks = async (req, res) => {
  try {
    const links = await Link.find().sort({ created_at: -1 });
    return res.json(links);
  } catch (err) {
    console.error("Get All Links Error:", err);
    return res.status(500).json({ error: "Internal server error." });
  }
};


/* 
  Get stats for a single short code
*/
exports.getLinkStats = async (req, res) => {
  try {
    const { code } = req.params;
    const link = await Link.findOne({ code });

    if (!link) {
      return res.status(404).json({ error: "Short code not found." });
    }

    return res.json(link);

  } catch (err) {
    console.error("Get Link Stats Error:", err);
    return res.status(500).json({ error: "Internal server error." });
  }
};


/* 
  Delete a link by short code
*/
exports.deleteLink = async (req, res) => {
  try {
    const { code } = req.params;
    const deleted = await Link.findOneAndDelete({ code });

    if (!deleted) {
      return res.status(404).json({ error: "Short code not found." });
    }

    return res.status(204).send();

  } catch (err) {
    console.error("Delete Link Error:", err);
    return res.status(500).json({ error: "Internal server error." });
  }
};


/* 
  Redirect to the target URL
  - Increments click count
  - Updates last_clicked timestamp
*/
exports.redirectToUrl = async (req, res) => {
  try {
    const { code } = req.params;
    const link = await Link.findOne({ code });

    if (!link) {
      return res.status(404).send("Short URL not found.");
    }

    link.clicks += 1;
    link.last_clicked = new Date();
    await link.save();

    return res.redirect(302, link.target);

  } catch (err) {
    console.error("Redirect Error:", err);
    return res.status(500).send("Internal server error.");
  }
};
