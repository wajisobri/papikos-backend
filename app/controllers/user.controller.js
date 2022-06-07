const User = require('../models/user.model.js');

exports.createUser = async (req, res) => {
  if(!req.body) {
    return res.status(400).send({
      status: 400,
      message: "Parameter can not be empty"
    })
  }

  try {
    const user = new User({
      ...req.body
    })

    user.save()
    .then(data => {
      return res.status(200).send({
        status: 200,
        message: "User created",
        data: data
      })
    })
    .catch(err => {
      return res.status(500).send({
        status: 500,
        message: err.message || "Some error occurred while creating the User."
      })
    })
  } catch(e) {
    console.error(e)
    return false
  }
};

exports.findAllUser = (req, res) => {
  try {
    User.find()
    .then(data => {
      return res.status(200).send({
        status: 200,
        message: "Retrieving all user data",
        data: data
      })
    })
    .catch(err => {
      return res.status(500).send({
        status: 500,
        message: err.message || "Some error occurred while creating the User."
      })
    })
  } catch(e) {
    console.error(e)
    return false
  }
};

exports.findAllUserBy = (req, res) => {
  try {
    User.find({ ...req.body })
    .then(data => {
      return res.status(200).send({
        status: 200,
        message: "Successfully retrieving all user data",
        data: data
      })
    })
    .catch(err => {
      return res.status(500).send({
        status: 500,
        message: err.message || "Some error occurred while retrieving user data."
      })
    })
  } catch(e) {
    console.error(e)
    return false
  }
};

exports.findOneUserById = async (req, res) => {
  const userId = req.params.userId

  User.findById(userId)
  .then(data => {
    if(!data) {
      return res.status(400).send({
        status: 400,
        message: "User not found with id." + userId
      })
    }

    return res.status(200).send({
      status: 200,
      message: "User found with id." + userId,
      data: data
    })
  })
  .catch(err => {
    return res.status(500).send({
      status: 500,
      message: err.message || "Error retrieving user with id." + userId
    })
  })
};

exports.updateUser = (req, res) => {
  if(!req.body) {
    return res.status(400).send({
      status: 400,
      message: "Parameter can not be empty"
    });
  }

  User.findByIdAndUpdate(req.params.userId, {
    ...req.body
  }, {new: true})
  .then(data => {
    if(!data) {
      return res.status(404).send({
        status: 404,
        message: "User not found with id " + req.params.userId
      });
    }
    return res.status(200).send({
      status: 200,
      message: "User updated",
      data
    });
  }).catch(err => {
    if(err.kind === 'ObjectId') {
      return res.status(404).send({
          message: "User not found with id " + req.params.userId
      });                
    }
    return res.status(500).send({
      message: "Error updating user with id " + req.params.userId
    });
  });
};

exports.deleteUser = (req, res) => {
  User.findByIdAndRemove(req.params.userId)
  .then(data => {
    if(!data) {
      return res.status(404).send({
        status: 404,
        message: "User not found with id " + req.params.userId
      });
    }
    return res.status(200).send({
      status: 200,
      message: "User deleted",
      data
    });
  }).catch(err => {
    if(err.kind === 'ObjectId' || err.name === 'NotFound') {
      return res.status(404).send({
        status: 404,
        message: "User not found with id " + req.params.userId
      });                
    }
    return res.status(500).send({
      status: 500,
      message: "Could not delete user with id " + req.params.userId
    });
  });
};

exports.loginUser = (req, res) => {
  const email = req.body.email
  const password = req.body.password

  User.findOne({ email: email })
  .then(data => {
    if(!data) {
      return res.status(400).send({
        status: 400,
        message: "Email not found with email " + email
      })
    } else {
      if(password != data.password) {
        return res.status(403).send({
          status: 403,
          message: "Password incorrect for email " + email
        })
      }

      return res.status(200).send({
        status: 200,
        message: "Login successfully",
        data: data
      })
    }
  })
  .catch(err => {
    return res.status(500).send({
      status: 500,
      message: err.message || "Error login with email." + email
    })
  })
};

exports.registerUser = (req, res) => {
  if(!req.body) {
    return res.status(400).send({
      status: 400,
      message: "Parameter can not be empty"
    })
  }
  
  try {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      district: req.body.district,
      user_type: req.body.user_type
    })

    user.save()
    .then(data => {
      return res.status(200).send({
        status: 200,
        message: "Register successfully",
        data: data
      })
    })
    .catch(err => {
      return res.status(500).send({
        status: 500,
        message: err.message || "Some error occurred while registering data."
      })
    })
  } catch(e) {
    console.error(e)
    return false
  }
};

exports.addToWishlist = (req, res) => {
  if(!req.body) {
    return res.status(400).send({
      status: 400,
      message: "Parameter can not be empty"
    });
  }

  User.findByIdAndUpdate(req.params.userId, {
    $push: { wishlist: req.body.kos_type_id }
  }, {new: true})
  .then(data => {
    if(!data) {
      return res.status(404).send({
        status: 404,
        message: "User not found with id " + req.params.userId
      });
    }
    return res.status(200).send({
      status: 200,
      message: "Wishlist added to user with id." + req.params.userId,
      data
    });
  }).catch(err => {
    if(err.kind === 'ObjectId') {
      return res.status(404).send({
          message: "User not found with id " + req.params.userId
      });                
    }
    return res.status(500).send({
      message: "Error updating user with id " + req.params.userId
    });
  });
};