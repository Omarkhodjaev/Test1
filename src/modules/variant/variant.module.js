const { Router } = require("express");
const VariantService = require("./variant.service");
const { VariantController } = require("./variant.controller");
const { AuthorizationMiddleware } = require("../../library/middleware");

const authorizationMiddleware = new AuthorizationMiddleware();

const variantService = new VariantService();
const variantController = new VariantController(variantService);
const router = Router();

router.post(
  "/",
  authorizationMiddleware.checkUser,
  authorizationMiddleware.adminRole,
  (req, res) => {
    variantController.create(req, res);
  }
);

router.get("/getallvariants", (req, res) => {
  variantController.getAll(req, res);
});

router.put("/:id", (req, res) => {
  variantController.update(req, res);
});

router.delete("/:id", authorizationMiddleware.checkUser,
authorizationMiddleware.adminRole, (req, res) => {
  variantController.delete(req, res);
});

module.exports = { router };
