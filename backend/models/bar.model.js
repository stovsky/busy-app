const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const barSchema = new Schema({
    hotness: { type: Number, required: true },
    location: { type: Array, required: true },
    id: { type: String, required: true },
    users: { type: Number, required: true},
}, {
    timestamps: true,
});

const Bar = mongoose.model('Bar', barSchema);

module.exports = Bar;