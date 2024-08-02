const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    user_id: { type: String, required: true },
    email: { type: String, required: true },
    roll_number: { type: String, required: true },
    numbers: [Number],
    alphabets: [String],
    highest_alphabet: [String]
});

module.exports = mongoose.model('User', userSchema);
