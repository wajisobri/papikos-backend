const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    gender: { type: String, default: undefined },
    phone: { type: String, default: undefined },
    district: String,
    identity_card: { type: mongoose.Schema.Types.Mixed, default: undefined },
    user_type: String,
    wishlist: { type: [mongoose.Schema.Types.ObjectId], default: undefined }
}, {
    timestamps: true
});

UserSchema.set('collection', 'user');

module.exports = mongoose.model('User', UserSchema);