const Order = require("../model/order.model");
const Item = require("../model/item.model");
const { count } = require("../model/user.model");


exports.insert = async (req, res) => {
    try {
        const uniNum = Math.floor(Math.random() * 10000);
        const userId = req.user.uniqueId;

        const item = req.body.item;
        for (var i = 0; i < item.length; i++) {
            const uniqueId = item[i].itemId;
            var aaz = await Item.findOne({ uniqueId: uniqueId });
            if (aaz == null) {
                res.status(404).json({
                    message: "Order cannot Insert",
                    status: 404,
                })
                break;
            }
        }
        if (aaz != null) {
            var tPrice = 0;
            for (const itemTotal of item) {
                const itemPrice = itemTotal.howMany * itemTotal.price
                tPrice += itemPrice
            }
            const insertData = new Order({
                orderId: "TO" + uniNum,
                userId: userId,
                item: item,
                total: tPrice
            })
            const saveData = await insertData.save();

            res.status(201).json({
                message: "Order Insert Sucessfully",
                status: 201,
                data: saveData
            })
        }

    } catch (error) {
        console.log("::insert-order-ERROR::", error);
        res.status(500).json({
            message: "SOMETHING WENT WRONG",
            status: 500
        })
    }
}

exports.update = async (req, res) => {
    try {
        const orderId = req.params.orderId;
        const itemFind = await Order.findOne({ orderId: orderId });

        const item = req.body.item;
        for (var i = 0; i < item.length; i++) {
            const uniqueId = item[i].itemId;
            var aaz = await Item.findOne({ uniqueId: uniqueId });
            if (aaz == null) {
                res.status(404).json({
                    message: "Order cannot Insert",
                    status: 404,
                })
                break;
            }
        }
        if (aaz != null) {

            if (itemFind.orderId == orderId) {
                var tPrice = 0;
                for (const itemTotal of item) {
                    const itemPrice = itemTotal.howMany * itemTotal.price
                    tPrice += itemPrice
                }

                const updateData = await Order.findOneAndUpdate(
                    {
                        orderId: orderId
                    },
                    {
                        $set: {
                            item: item,
                            total: tPrice
                        }
                    },
                    {
                        new: true
                    });
                res.status(200).json({
                    message: "Order Update sucessfully",
                    status: 200
                })

            } else {
                res.status(401).json({
                    message: "Enter Valid OrderId",
                    status: 401
                })
            }
        }
    } catch (error) {
        console.log("::update-order-ERROR::", error);
        res.status(500).json({
            message: "SOMETHING WENT WRONG",
            status: 500
        })
    }
}

exports.latest = async (req, res) => {
    try {
        const findAllData = await Order.find({}).sort({ _id: -1 }).limit(3)

        res.status(200).json({
            message: " show all data",
            status: 200,
            data: findAllData
        })
    } catch (error) {
        console.log("::latest-order-ERROR::", error);
        res.status(500).json({
            message: "SOMETHING WENT WRONG",
            status: 500
        })
    }
}

exports.me = async (req, res) => {
    try {
        const uniqueId = req.user.uniqueId
        const showOrderuniqueId = await Order.find({ userId: uniqueId });

        res.status(200).json({
            message: "Show By userId",
            status: 200,
            data: showOrderuniqueId
        })
    } catch (error) {
        console.log("::me-order-ERROR::", error);
        res.status(500).json({
            message: "SOMETHING WENT WRONG",
            status: 500
        })
    }
}