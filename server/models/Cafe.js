const mongoose = require('mongoose')

const CafeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        minLength: [2, "Name must be at least 2 characters"]
    },
    location: {
        type: String,
        required: [true, "Location is required"]
    },
    isRoaster: {
        type: Boolean
    }
}, {timestamps: true})

module.exports = mongoose.model("Cafe", CafeSchema);