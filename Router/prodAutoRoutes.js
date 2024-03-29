const express = require("express");
const documentController = require("./../controllers/prodAutoController");
const authController = require("./../controllers/authController");
const model = require("./../Models/prodHouseModel");

const router = express.Router();

router.get("/", documentController.getAllDocuments);
router.post("/", authController.protect, documentController.createDocument);
router.get("/me", authController.protect, documentController.getUserProduct);

router.get(
  "/wishlist",
  authController.protect,
  authController.isPermitted(model),
  documentController.getWishlist,
);
router.post(
  "/wishlist/:id",
  authController.protect,
  authController.isPermitted(model),
  documentController.addRemoveFromwishlist,
);
router.get("/:id", documentController.getDocument);
router.get(
  "/:id/accept",
  authController.protect,
  authController.isAdmin,
  documentController.accept,
);
router.get(
  "/:id/reject",
  authController.protect,
  authController.isAdmin,
  documentController.reject,
);
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
