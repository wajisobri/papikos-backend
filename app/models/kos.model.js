const mongoose = require('mongoose');

const LocationSchema = mongoose.Schema({
  full_address: String,
  district: String,
  zip_code: Number,
  geo_coordinate: {
    latitude: { type: Number, default: undefined },
    longitude: { type: Number, default: undefined }
  },
  near_place: { type: [String], default: undefined },
})

const KosSchema = mongoose.Schema({
    name: String,
    approve_status: Boolean,
    rules: { type: [String], default: undefined },
    location: LocationSchema,
    owner_id: mongoose.Schema.Types.ObjectId,
    kos_type_id: { type: [mongoose.Schema.Types.ObjectId], default: undefined },
    proof_of_ownership: { type: mongoose.Schema.Types.Mixed, default: undefined }
}, {
    timestamps: true
});

KosSchema.set('collection', 'kos');

module.exports = mongoose.model('Kos', KosSchema);