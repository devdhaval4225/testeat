const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    orderId: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.String,
        ref: 'user'
    },
    item: {
        type: Array,
        required: true
    },
    total: {
        type: Number,
        // required: true
    }
}, {
    timestamps: true
}, {
    collection: 'orders'
});

module.exports = mongoose.model("orders", orderSchema);