const KosType = require('../models/kos_type.model.js');
const Kos = require('../models/kos.model.js');

exports.createKosType = (req, res) => {
  if(!req.body) {
    return res.status(400).send({
      status: 400,
      message: "Body can not be empty"
    })
  }

  if(!req.params) {
    return res.status(400).send({
      status: 400,
      message: "Parameter can not be empty"
    })
  }

  try {
    const kostype = new KosType({
      ...req.body
    })

    kostype.save()
    .then(data => {
      Kos.findByIdAndUpdate(req.params.kosId, {
        $push: { kos_type_id: data._id }
      }, {new: true})
      .then(data2 => {
        if(!data2) {
          return res.status(404).send({
            status: 404,
            message: "Kos not found with id " + req.params.kosId
          });
        }

        return res.status(200).send({
          status: 200,
          message: "Kos Type created",
          data: {
            kos: data2,
            kos_type: data
          }
        })
      })
      .catch(err => {
        if(err.kind === 'ObjectId') {
          return res.status(404).send({
              message: "Kos not found with id " + req.params.kosId
          });                
        }
        return res.status(500).send({
          message: "Error updating Kos with id " + req.params.kosId
        });
      });
    })
    .catch(err => {
      return res.status(500).send({
        status: 500,
        message: err.message || "Some error occurred while creating Kos Type"
      })
    })
  } catch(e) {
    console.error(e)
    return false
  }
};

exports.findAllKosType = (req, res) => {
  try {
    KosType.find()
    .then(data => {
      return res.status(200).send({
        status: 200,
        message: "Successfully retrieving all kos data",
        data: data
      })
    })
    .catch(err => {
      return res.status(500).send({
        status: 500,
        message: err.message || "Some error occurred while retrieving kos data."
      })
    })
  } catch(e) {
    console.error(e)
    return false
  }
};

exports.findAllKosTypeBy = (req, res) => {
  try {
    KosType.find({ ...req.body })
    .then(data => {
      return res.status(200).send({
        status: 200,
        message: "Successfully retrieving all kos type data",
        data: data
      })
    })
    .catch(err => {
      return res.status(500).send({
        status: 500,
        message: err.message || "Some error occurred while retrieving kos type data."
      })
    })
  } catch(e) {
    console.error(e)
    return false
  }
};

exports.findOneKosTypeById = (req, res) => {
  const kosTypeId = req.params.kosTypeId

  KosType.findById(kosTypeId)
  .then(data => {
    if(!data) {
      return res.status(400).send({
        status: 400,
        message: "Kos Type not found with id." + kosTypeId
      })
    }

    return res.status(200).send({
      status: 200,
      message: "Kos Type found with id." + kosTypeId,
      data: data
    })
  })
  .catch(err => {
    return res.status(500).send({
      status: 500,
      message: err.message || "Error retrieving Kos Type with id." + kosTypeId
    })
  })
};

exports.updateKosType = (req, res) => {
  if(!req.body) {
    return res.status(400).send({
      status: 400,
      message: "Parameter can not be empty"
    });
  }

  KosType.findByIdAndUpdate(req.params.kosTypeId, {
    ...req.body
  }, {new: true})
  .then(data => {
    if(!data) {
      return res.status(404).send({
        status: 404,
        message: "Kos type not found with id " + req.params.kosTypeId
      });
    }
    return res.status(200).send({
      status: 200,
      message: "Kos type updated",
      data
    });
  }).catch(err => {
    if(err.kind === 'ObjectId') {
      return res.status(404).send({
          message: "Kos type not found with id " + req.params.kosTypeId
      });                
    }
    return res.status(500).send({
      message: "Error updating Kos Type with id " + req.params.kosTypeId
    });
  });
};

exports.deleteKosType = (req, res) => {
  KosType.findByIdAndRemove(req.params.kosTypeId)
  .then(data => {
    if(!data) {
      return res.status(404).send({
        status: 404,
        message: "Kos type not found with id " + req.params.kosTypeId
      });
    }

    Kos.findByIdAndUpdate(req.params.kosId, {
      $pull: { kos_type_id: data._id }
    }, {new: true})
    .then(data2 => {
      if(!data2) {
        return res.status(404).send({
          status: 404,
          message: "Kos not found with id " + req.params.kosId
        });
      }

      return res.status(200).send({
        status: 200,
        message: "Kos Type deleted",
        data: {
          kos: data2,
          kos_type: data
        }
      });
    })
    .catch(err => {
      if(err.kind === 'ObjectId') {
        return res.status(404).send({
            message: "Kos not found with id " + req.params.kosId
        });                
      }
      return res.status(500).send({
        message: "Error updating Kos with id " + req.params.kosId
      });
    });
  }).catch(err => {
    if(err.kind === 'ObjectId' || err.name === 'NotFound') {
      return res.status(404).send({
        status: 404,
        message: "Kos type not found with id " + req.params.kosTypeId
      });                
    }
    return res.status(500).send({
      status: 500,
      message: "Could not delete kos type with id " + req.params.kosTypeId
    });
  });
};