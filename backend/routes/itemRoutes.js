const {
    getProducts,
    postProduct,
    updateProduct,
    deleteProduct,
    getProductsbychat,
} = require('../controllers/itemController');
const express = require('express');
const validateToken = require('../middleware/isLoggedIn');

const router = express.Router();
router.get('/', getProducts);

router.post('/', postProduct);

router.put('/:id',updateProduct)

router.delete('/:id',deleteProduct)
router.post ('/chats',getProductsbychat)

module.exports = router;
