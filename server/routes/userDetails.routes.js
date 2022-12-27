const express = require("express");
const router = express.Router();
const UserDetailsController = require("../controllers/userDetails.controller");

router.get("/details", UserDetailsController.display);
router.post("/details/register", UserDetailsController.register);
router.get("/details/:userId", UserDetailsController.getByUserID);
router.patch("/details/:userId", UserDetailsController.updateUserDetails);
router.patch(
    "/details/setAddressDefault/:userId",
    UserDetailsController.setDefaultAddress
);
router.delete("/details/delete/:id", UserDetailsController.deleteUserDetails);

// router.get("/details/:id", UserDetailsController.getByID);

module.exports = router;
