const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TestSchema = new Schema({
    x:{
        type: Number,
    },
    y:{
        type: Number,
    }
});

module.exports = Positions = mongoose.model('Positions', TestSchema);