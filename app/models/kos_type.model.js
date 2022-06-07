const mongoose = require('mongoose');

const ReviewKosTypeSchema = mongoose.Schema({
    reviewer: mongoose.Schema.Types.ObjectId,
    rating: Number,
    message: String,
    createdAt: mongoose.Schema.Types.Mixed,
    updatedAt: mongoose.Schema.Types.Mixed
})

const KosTypeSchema = mongoose.Schema({
    type_name: String,
    img: { type: [String], default: undefined },
    description: {
        dimension: [Number],
        facility: { type: mongoose.Schema.Types.Mixed, default: undefined }
    },
    price: Number,
    status: String,
    room_avaibility: Number,
    review: { type: [ReviewKosTypeSchema], default: undefined }
}, {
    timestamps: true
});

KosTypeSchema.set('collection', 'kos_type');

module.exports = mongoose.model('KosType', KosTypeSchema);