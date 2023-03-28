const router = require("express").Router();
const { verifyUser } = require("../middleware/user.auth");


const {
    insert,
    update,
    latest,
    me
} = require("../controller/orders.controller");


router.post("/insert", verifyUser, insert);
router.put("/update/:orderId", verifyUser, update);
router.get("/latest", latest);
router.get("/me", verifyUser, me);




module.exports = router;