const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    handle: {  },
    title: {},
    body: {},
    vendor: {},
    tags: {},
    options: [{}], 
    variant: {
        sku: {},
        grams: {},
        inventoryTracker: {},
        inventoryQty: {},
        inventoryPolicy: {},
        fulfillmentService: {},
        price: {},
        compareAtPrice: {}
    },
    imageSrc: {}
}, { strict: false }); 

const Product = mongoose.model("items", productSchema);
module.exports = Product;
