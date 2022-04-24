const express = require("express");
const documentController = require("./../controllers/prodAutoController");
const authController = require("./../controllers/authController");
const model = require("./../Models/prodHouseModel");

const router = express.Router();

router.get("/", documentController.getAllDocuments);
router.post("/", authController.protect, documentController.createDocument);
router.get("/:id", authController.protect, documentController.getDocument);
router.patch(
  "/:id",
  authController.protect,
  authController.isPermitted(model),
  documentController.updateDocument,
);
router.delete(
  "/:id",
  authController.protect,
  authController.isPermitted(model),
  documentController.deleteDocument,
);

module.exports = router;
