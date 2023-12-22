const { Router } = require("express");
const VariantService = require("./variant.service");
const { VariantController } = require("./variant.controller");
const { AuthorizationMiddleware } = require("../../library/middleware");

const authorizationMiddleware = new AuthorizationMiddleware();

const variantService = new VariantService();
const variantController = new VariantController(variantService);
const router = Router();

router.post(
  "/create",
  authorizationMiddleware.checkUser,
  authorizationMiddleware.adminRole,
  (req, res) => {
    variantController.create(req, res);
  }
);

module.exports = { router };
