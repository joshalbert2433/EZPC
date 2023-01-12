const express = require("express");
const router = express.Router();
const UserDetailsController = require("../controllers/userDetails.controller");
const isAuth = require("../utils/isAuth");

router.get("/details", isAuth, UserDetailsController.display);
router.post("/details/register", isAuth, UserDetailsController.register);
router.get("/details/:userId", isAuth, UserDetailsController.getByUserID);
router.patch(
	"/details/:userId",
	isAuth,
	UserDetailsController.updateUserDetails
);
router.patch(
	"/details/setAddressDefault/:userId",
	isAuth,
	UserDetailsController.setDefaultAddress
);
router.delete(
	"/details/delete/:id",
	isAuth,
	UserDetailsController.deleteUserDetails
);

module.exports = router;
