const Booking = require('../models/booking.model.js');

exports.createBooking = (req, res) => {
  if(!req.body) {
    return res.status(400).send({
      status: 400,
      message: "Parameter can not be empty"
    })
  }

  try {
    const booking = new Booking({
      ...req.body
    })

    booking.save()
    .then(data => {
      return res.status(200).send({
        status: 200,
        message: "Booking created",
        data: data
      })
    })
    .catch(err => {
      return res.status(500).send({
        status: 500,
        message: err.message || "Some error occurred while creating Booking"
      })
    })
  } catch(e) {
    console.error(e)
    return false
  }
};

exports.findAllBooking = (req, res) => {
  try {
    Booking.find()
    .then(data => {
      return res.status(200).send({
        status: 200,
        message: "Successfully retrieving all booking data",
        data: data
      })
    })
    .catch(err => {
      return res.status(500).send({
        status: 500,
        message: err.message || "Some error occurred while retrieving booking data."
      })
    })
  } catch(e) {
    console.error(e)
    return false
  }
};

exports.findAllBookingBy = (req, res) => {
  try {
    Booking.find({ ...req.body })
    .then(data => {
      return res.status(200).send({
        status: 200,
        message: "Successfully retrieving all booking data",
        data: data
      })
    })
    .catch(err => {
      return res.status(500).send({
        status: 500,
        message: err.message || "Some error occurred while retrieving booking data."
      })
    })
  } catch(e) {
    console.error(e)
    return false
  }
};

exports.findOneBookingById = (req, res) => {
  const bookingId = req.params.bookingId

  Booking.findById(bookingId)
  .then(data => {
    if(!data) {
      return res.status(400).send({
        status: 400,
        message: "Booking not found with id." + bookingId
      })
    }

    return res.status(200).send({
      status: 200,
      message: "Booking found with id." + bookingId,
      data: data
    })
  })
  .catch(err => {
    return res.status(500).send({
      status: 500,
      message: err.message || "Error retrieving Booking with id." + bookingId
    })
  })
};

exports.updateBooking = (req, res) => {
  if(!req.body) {
    return res.status(400).send({
      status: 400,
      message: "Parameter can not be empty"
    });
  }

  Booking.findByIdAndUpdate(req.params.bookingId, {
    ...req.body
  }, {new: true})
  .then(data => {
    if(!data) {
      return res.status(404).send({
        status: 404,
        message: "Booking not found with id " + req.params.bookingId
      });
    }
    return res.status(200).send({
      status: 200,
      message: "Booking updated",
      data
    });
  }).catch(err => {
    if(err.kind === 'ObjectId') {
      return res.status(404).send({
          message: "Booking not found with id " + req.params.bookingId
      });                
    }
    return res.status(500).send({
      message: "Error updating Booking with id " + req.params.bookingId
    });
  });
};

exports.deleteBooking = (req, res) => {
  Booking.findByIdAndRemove(req.params.bookingId)
  .then(data => {
    if(!data) {
      return res.status(404).send({
        status: 404,
        message: "Booking not found with id " + req.params.bookingId
      });
    }
    return res.status(200).send({
      status: 200,
      message: "Booking deleted",
      data
    });
  }).catch(err => {
    if(err.kind === 'ObjectId' || err.name === 'NotFound') {
      return res.status(404).send({
        status: 404,
        message: "Booking not found with id " + req.params.bookingId
      });                
    }
    return res.status(500).send({
      status: 500,
      message: "Could not delete booking with id " + req.params.bookingId
    });
  });
};