const Review = require('../models/review.model.js');
const KosType = require('../models/kos_type.model.js');

exports.createReview = (req, res) => {
  if(!req.body) {
    return res.status(400).send({
      status: 400,
      message: "Body can not be empty"
    })
  }

  try {
    const review = new Review({
      ...req.body
    })

    review.save()
    .then(data => {
      KosType.findByIdAndUpdate(req.body.kos_type_id, {
        $push: { review: {
          _id: data._id,
          reviewer: req.body.reviewer,
          rating: req.body.rating,
          message: req.body.message,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt
        } }
      }, {new: true})
      .then(data2 => {
        if(!data2) {
          return res.status(404).send({
            status: 404,
            message: "Kos Type not found with id " + req.params.kosTypeId
          });
        }

        return res.status(200).send({
          status: 200,
          message: "Review created",
          data: {
            kos_type: data2,
            review: data
          }
        })
      })
      .catch(err => {
        if(err.kind === 'ObjectId') {
          return res.status(404).send({
              message: "Kos Type not found with id " + req.params.kosTypeId
          });                
        }
        return res.status(500).send({
          message: "Error updating Kos Type with id " + req.params.kosTypeId
        });
      });
    })
    .catch(err => {
      return res.status(500).send({
        status: 500,
        message: err.message || "Some error occurred while creating Review"
      })
    })
  } catch(e) {
    console.error(e)
    return false
  }
};

exports.findAllReview = (req, res) => {
  try {
    Review.find()
    .then(data => {
      return res.status(200).send({
        status: 200,
        message: "Successfully retrieving all review data",
        data: data
      })
    })
    .catch(err => {
      return res.status(500).send({
        status: 500,
        message: err.message || "Some error occurred while retrieving review data."
      })
    })
  } catch(e) {
    console.error(e)
    return false
  }
};

exports.findOneReviewById = (req, res) => {
  const reviewId = req.params.reviewId

  Review.findById(reviewId)
  .then(data => {
    if(!data) {
      return res.status(400).send({
        status: 400,
        message: "Review not found with id." + reviewId
      })
    }

    return res.status(200).send({
      status: 200,
      message: "Review found with id." + reviewId,
      data: data
    })
  })
  .catch(err => {
    return res.status(500).send({
      status: 500,
      message: err.message || "Error retrieving Review with id." + reviewId
    })
  })
};

exports.updateReview = (req, res) => {
  if(!req.body) {
    return res.status(400).send({
      status: 400,
      message: "Parameter can not be empty"
    });
  }

  Review.findByIdAndUpdate(req.params.reviewId, {
    ...req.body
  }, {new: true})
  .then(data => {
    if(!data) {
      return res.status(404).send({
        status: 404,
        message: "Review not found with id " + req.params.reviewId
      });
    }
    return res.status(200).send({
      status: 200,
      message: "Review updated",
      data
    });
  }).catch(err => {
    if(err.kind === 'ObjectId') {
      return res.status(404).send({
          message: "Review not found with id " + req.params.reviewId
      });                
    }
    return res.status(500).send({
      message: "Error updating Review with id " + req.params.reviewId
    });
  });
};

exports.deleteReview = (req, res) => {
  Review.findByIdAndRemove(req.params.reviewId)
  .then(data => {
    if(!data) {
      return res.status(404).send({
        status: 404,
        message: "Review not found with id " + req.params.reviewId
      });
    }

    KosType.findByIdAndUpdate(data.kos_type_id, {
      $pull: { review: { _id: data._id } }
    }, {new: true})
    .then(data2 => {
      if(!data2) {
        return res.status(404).send({
          status: 404,
          message: "Kos type not found with id " + data.kos_type_id
        });
      }

      return res.status(200).send({
        status: 200,
        message: "Review deleted",
        data: {
          kos_type: data2,
          review: data
        }
      });
    })
    .catch(err => {
      if(err.kind === 'ObjectId') {
        return res.status(404).send({
            message: "Kos Type not found with id " + data.kos_type_id
        });                
      }
      return res.status(500).send({
        message: "Error updating Kos Type with id " + data.kos_type_id
      });
    });
  }).catch(err => {
    if(err.kind === 'ObjectId' || err.name === 'NotFound') {
      return res.status(404).send({
        status: 404,
        message: "Review not found with id " + req.params.reviewId
      });                
    }
    return res.status(500).send({
      status: 500,
      message: "Could not delete Review with id " + req.params.reviewId
    });
  });
};