const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movementSchema = new Schema({
    name: { type: String, required: true },
    type: { type: String, required: true}
})
const Movement = mongoose.model("Movement",movementSchema);

module.exports = Movement;