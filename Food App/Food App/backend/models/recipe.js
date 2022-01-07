const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipeschema = new Schema({
    user_id: { type: Object, required: false },
    name: { type: String, required: true },
    country: { type: String, required: false },
    serving: { type: Number, required: false },
    time: { type: Number, required: false },
    difficulty: { type: Number, required: false },
    type: { type: String, required: true },
    glutenfree: { type: Boolean, required: true },
    lactosefree: { type: Boolean, required: true },
    milkfree: { type: Boolean, required: true },
    eggfree: { type: Boolean, required: true },
    vegan: { type: Boolean, required: true },
    ingredient: { type: Object, required: true },
    mainingredient: { type: String, required: true },
    public: { type: Boolean, required: true },
    text: { type: String, required: true }
});

module.exports = mongoose.model("Recipe", recipeschema);