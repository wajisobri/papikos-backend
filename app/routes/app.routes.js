module.exports = (app) => {
  const user = require('../controllers/user.controller.js');
  const kos = require('../controllers/kos.controller.js');
  const kos_type = require('../controllers/kos_type.controller.js');
  const review = require('../controllers/review.controller.js');
  const booking = require('../controllers/booking.controller.js');

  app.post('/user', user.createUser);
  app.get('/user', user.findAllUser);
  app.post('/user/search', user.findAllUserBy);
  app.get('/user/:userId', user.findOneUserById);
  app.put('/user/:userId', user.updateUser);
  app.delete('/user/:userId', user.deleteUser);
  app.post('/user/login', user.loginUser);
  app.post('/user/register', user.registerUser);
  app.post('/wishlist/:userId', user.addToWishlist);

  app.get('/kos', kos.findAllKos);
  app.post('/kos/search', kos.findAllKosBy);
  app.get('/kos/:kosId', kos.findOneKosById);
  app.post('/kos', kos.createKos);
  app.put('/kos/:kosId', kos.updateKos);
  app.delete('/kos/:kosId', kos.deleteKos);

  app.get('/kos-type', kos_type.findAllKosType)
  app.post('/kos-type/search', kos_type.findAllKosTypeBy)
  app.get('/kos-type/:kosTypeId', kos_type.findOneKosTypeById);
  app.post('/kos-type/:kosId', kos_type.createKosType);
  app.put('/kos-type/:kosTypeId', kos_type.updateKosType);
  app.delete('/kos-type/:kosId/:kosTypeId', kos_type.deleteKosType);

  app.get('/review', review.findAllReview)
  app.get('/review/:reviewId', review.findOneReviewById);
  app.post('/review', review.createReview);
  app.put('/review/:reviewId', review.updateReview);
  app.delete('/review/:reviewId', review.deleteReview);

  app.get('/booking', booking.findAllBooking)
  app.post('/booking/search', booking.findAllBookingBy)
  app.get('/booking/:bookingId', booking.findOneBookingById);
  app.post('/booking', booking.createBooking);
  app.put('/booking/:bookingId', booking.updateBooking);
  app.delete('/booking/:bookingId', booking.deleteBooking);
}