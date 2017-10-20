const mongoose = require('mongoose');
const Ingredient = require('../models/ingredient.js');
const Dish = require('../models/dish.js');
const dataIngredients = require('../../../data/ingredients.json');
const dataDishes = require('../../../data/dishes.json');

mongoose.connect('mongodb://localhost/lab-vue-express-recipes', {useMongoClient: true});

// 1st: remove all ingredients
Ingredient.remove({}, function(err) { 
  if (err) {
    throw err;
  }
  console.log("All ingredients are removed");
  // 2nd: remove all dishes
  Dish.remove({}, function(err) {
    if (err) {
      throw err;
    }
    console.log("All dished are removed");
    
    // 3rd: add all ingredients
    Ingredient.create(dataIngredients, (err, ingredients) => {
      if (err) {
        throw err;
      }
      ingredients.forEach((ingredient) => {
        console.log("New ingredient:", ingredient.name)
      });

      // 4th: add all dishes
      Dish.create(dataDishes, (err, dishes) => {
        if (err) {
          throw err;
        }
      
        dishes.forEach((dish) => {
          console.log("New dish:", dish.name)
        });
        mongoose.connection.close();
      });
    });
  });
});

