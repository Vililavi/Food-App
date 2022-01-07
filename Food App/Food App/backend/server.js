const express = require('express');
const app = express();
const mongoose = require("mongoose");
const user_routes = require("./routes/user_routes");
const recipe_routes = require("./routes/recipe_routes");
const cors = require('cors');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());


app.use("/user_routes", user_routes);
app.use("/recipe_routes", recipe_routes);


mongoose.connect("mongodb+srv://user:user1234@cluster0.y8paz.mongodb.net/Ruoka_Appi?"
    + "retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log("connected"));

app.listen(5000);

