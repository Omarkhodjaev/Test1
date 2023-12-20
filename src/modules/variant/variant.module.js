const { Router } = require("express");
const VariantService = require("./variant.service");
const { VariantController } = require("./variant.controller");

const variantService = new VariantService();
const variantController = new VariantController(variantService);
const router = Router();

router.post("/create", (req, res) => {
  variantController.create(req, res);
});

module.exports = { router };
