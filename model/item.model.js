const mongoose = require("mongoose");

const itemsSchema = new mongoose.Schema({
    uniqueId: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    image: {
        type: Array,
    },
    subTitle: {
        type: String,
        require: true
    },
    desc: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    tags: {
        type: String,
        require: true
    }
}, {
    timestamps: true
}, {
    collection: 'item'
});

module.exports = mongoose.model("item", itemsSchema);