const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cart-controller");
const validateToken = require('../middleware/isLoggedIn');

router.use(validateToken);
router.get("/", cartController.getCartItems);


router.post("/", cartController.addCartItem);

  

router.put("/:id", cartController.updateCartItem);


router.delete("/:id", cartController.deleteCartItem);

module.exports = router;
