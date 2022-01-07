const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userschema = new Schema({

    username: { type: String, required: true },
    password: { type: String, required: true },
    __v: { type: Number, select: false }
});

module.exports = mongoose.model("User", userschema);