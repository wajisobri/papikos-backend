const mongoose = require('mongoose');

const BillSchema = mongoose.Schema({
  kos_owner: mongoose.Schema.Types.ObjectId,
  amount: Number,
  date: Date,
})

const BookingSchema = mongoose.Schema({
    customer: mongoose.Schema.Types.ObjectId,
    kos_type_id: mongoose.Schema.Types.ObjectId,
    check_in_date: Date,
    duration: Number,
    check_out_date: Date,
    status: String,
    note: String,
    bill: BillSchema
}, {
    timestamps: true
});

BookingSchema.set('collection', 'booking');

module.exports = mongoose.model('Booking', BookingSchema);