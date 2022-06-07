const Kos = require('../models/kos.model.js');

exports.createKos = (req, res) => {
  if(!req.body) {
    return res.status(400).send({
      status: 400,
      message: "Parameter can not be empty"
    })
  }

  try {
    const kos = new Kos({
      ...req.body
    })

    kos.save()
    .then(data => {
      return res.status(200).send({
        status: 200,
        message: "Kos created",
        data: data
      })
    })
    .catch(err => {
      return res.status(500).send({
        status: 500,
        message: err.message || "Some error occurred while creating Kos."
      })
    })
  } catch(e) {
    console.error(e)
    return false
  }
};

exports.findAllKos = (req, res) => {
  try {
    Kos.find()
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

exports.findAllKosBy = (req, res) => {
  try {
    Kos.find({ ...req.body })
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

exports.findOneKosById = (req, res) => {
  const kosId = req.params.kosId

  Kos.findById(kosId)
  .then(data => {
    if(!data) {
      return res.status(400).send({
        status: 400,
        message: "Kos not found with id." + kosId
      })
    }

    return res.status(200).send({
      status: 200,
      message: "Kos found with id." + kosId,
      data: data
    })
  })
  .catch(err => {
    return res.status(500).send({
      status: 500,
      message: err.message || "Error retrieving Kos with id." + kosId
    })
  })
};

exports.updateKos = (req, res) => {
  if(!req.body) {
    return res.status(400).send({
      status: 400,
      message: "Parameter can not be empty"
    });
  }

  Kos.findByIdAndUpdate(req.params.kosId, {
    ...req.body
  }, {new: true})
  .then(data => {
    if(!data) {
      return res.status(404).send({
        status: 404,
        message: "Kos not found with id " + req.params.kosId
      });
    }
    return res.status(200).send({
      status: 200,
      message: "Kos updated",
      data
    });
  }).catch(err => {
    if(err.kind === 'ObjectId') {
      return res.status(404).send({
          message: "Kos not found with id " + req.params.kosId
      });                
    }
    return res.status(500).send({
      message: "Error updating Kos with id " + req.params.kosId
    });
  });
};

exports.deleteKos = (req, res) => {
  Kos.findByIdAndRemove(req.params.kosId)
  .then(data => {
    if(!data) {
      return res.status(404).send({
        status: 404,
        message: "Kos not found with id " + req.params.kosId
      });
    }
    return res.status(200).send({
      status: 200,
      message: "Kos deleted",
      data
    });
  }).catch(err => {
    if(err.kind === 'ObjectId' || err.name === 'NotFound') {
      return res.status(404).send({
        status: 404,
        message: "Kos not found with id " + req.params.kosId
      });                
    }
    return res.status(500).send({
      status: 500,
      message: "Could not delete kos with id " + req.params.kosId
    });
  });
};