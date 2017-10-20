var express = require('express');
var router = express.Router();
var Dish = require('../models/dish');

/* GET home page */
router.get('/', function(req, res, next) {
  res.json({ text: "Hello world!" });
});

/* GET all dishes */
router.get('/api/dishes', function(req, res, next) {
  Dish.find({}).exec((err, dishes) => {
    if (err) {
      next(err);
    }
    res.json(dishes); 
  })
});

module.exports = router;
