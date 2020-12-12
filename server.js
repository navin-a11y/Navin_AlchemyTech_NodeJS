const app = require('./app');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path: './config.env'});

const mongouri = "mongodb+srv://Navin_2701:root@cluster0.d0wqh.mongodb.net/ShoppingCart";

mongoose.connect(mongouri, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})

mongoose.connection.on("connection", () =>{
    console.log("Database connected successfully");
});

mongoose.connection.on("error", (error) => {
    console.log("Database is not connected");
});

const PORT = process.env.PORT;
app.listen(PORT);
console.log(`app is running on the port ${PORT}`);