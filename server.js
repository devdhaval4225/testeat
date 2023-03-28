const express = require("express");
const app = express();
const cors = require("cors")
require("dotenv").config();
require("./database/connection");

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));


const adminRouter = require("./routes/admin.routes");
const itemsRouter = require("./routes/items.routes");
const orderRouter = require("./routes/orders.routes");
const userRouter = require("./routes/user.routes");
app.use("/admin", adminRouter);
app.use("/item", itemsRouter);
app.use("/order", orderRouter);
app.use("/user", userRouter);

app.listen(port, () => {
    console.log("===============================================");
    console.log(`Server is Running At PORT : ${port}`);
})
