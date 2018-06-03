const express = require('express');
const router  = express.Router();
const contactController = require('../controllers/contactController');

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.post('/contact', contactController.sendContactMail);

module.exports = router;
