const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    
    group: {
        type: String
    }
});

module.exports = mongoose.model('Breed', schema);
