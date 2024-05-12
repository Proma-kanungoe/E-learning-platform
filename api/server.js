require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser")
const path = require('path')

// IMPORT ROUTERS
const userRouter = require("./routers/user.router")
const viewRouter = require("./routers/view.router")
const adminRouter = require("./routers/admin.router")
const coursesRouter = require("./routers/courses.router")
const orderRouter = require("./routers/order.router")




const app = express();



// middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())

const corsOptions = { exposedHeaders: 'Authorization'};

app.use(cors(corsOptions))


// MONGOOSE
// const mongoUrl = process.env.MONGODB_URL || MONGODB_URL;
const mongoUrl = "mongodb://127.0.0.1:27017/courses";
// mongodb://127.0.0.1:27017/
mongoose.connect(`${mongoUrl}`, console.log("Connected to mongo `Successful"));

app.use(express.static(path.join(__dirname, 'public')));


app.use("/api/user",userRouter)
app.use("/api/view",viewRouter)
app.use("/api/admin",adminRouter)
app.use("/api/courses",coursesRouter)
app.use("/api/order",orderRouter)




const PORT = process.env.PORT;
app.listen(PORT,()=>{
    console.log(`Server is running at PORT ${PORT}`);
})