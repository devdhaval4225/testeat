const router = require("express").Router();
const { verifyAdmin } = require("../middleware/admin.auth");
const upload = require("../utils/upload.image");


const {
    insert,
    update,
    list,
    one
} = require("../controller/items.controller");


router.post("/insert", verifyAdmin, upload.array('image'), insert);
router.put("/update/:uniqueId", verifyAdmin, upload.array('image'), update);
router.get("/one/:uniqueId", one);
router.get("/list", list);




module.exports = router;