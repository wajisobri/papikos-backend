const mongoose = require('mongoose');

const ReviewSchema = mongoose.Schema({
    reviewer: mongoose.Schema.Types.ObjectId,
    kos_type_id: mongoose.Schema.Types.ObjectId,
    rating: Number,
    message: { type: String, default: undefined },
}, {
    timestamps: true
});

ReviewSchema.set('collection', 'review');

module.exports = mongoose.model('Review', ReviewSchema);