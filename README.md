![ck Logo](https://i.imgur.com/1QgrNNw.png)

# Vue.js & Express API | MyRecipeBook

## Introduction

![](https://camo.githubusercontent.com/38e5628f6fa389ad6f84297ec1bfafb2ee2118b8/68747470733a2f2f73332d65752d776573742d312e616d617a6f6e6177732e636f6d2f69682d6d6174657269616c732f75706c6f6164732f75706c6f61645f61653566646634623732303861386130396532346533306536383234383630662e6a7067)

Cooking is hard, but you know what's harder? Remembering recipes. Remember that one time you made that amazing dish and forgot what ingredients go into it? It's a terrible feeling.

In this exercise, we'll make a an application to keep track of your favorite recipes so you never have this disappointing experience again.

This application can apply to food or dishes, so feel free to alter the language accordingly.


## Instructions

You are going to make from scratch a web application recipe book with two parts: the front-end in Vue.js (Client) and the back-end in Express (Server).

### Client

The users that go on your websites will have access to 4 possible routes:
- `/`: Redirect the user to `/dishes`
- `/dishes`: Display a list of all dishes, with a link 
- `/dishes/:dishId`: Display the recipe of a specific dish, with the descriptions and all it's ingredients
- `/new-dish`: Display a form page to add a new dish

**Example of page seen on "/dishes"**
![/dishes](http://i.imgur.com/qw1ADPz.png)


**Example of page seen on "/dishes/598c147d82ff710a38fd6027"**
![/dishes/:dishId](http://i.imgur.com/SFRNUFe.png)



### Server

You are going to create your own Rest API with Express. For that, 2 models are going to be needed: `Ingredient` and `DishSchema` 

```javascript
// Inside "server/models/ingredient.js"
const IngredientSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  unity: String
});

// Inside "server/models/dish.js"
const DishSchema = new Schema({
  name: {
    type: String,
    required: [true, 'name is required']
  },
  description: {
    type: String,
    required: [true, 'description is required']
  },
  image: String,
  ingredients: [
    {
      ingredient: {
        type: Schema.Types.ObjectId,
        ref: 'Ingredient'
      },
      quantity: Number,
      _id: false
    }
  ]
});
```

For your API, you can create the following endpoints:
- `GET  /api/dishes`: Returns all dishes with only their id, names and images
- `GET  /api/dishes/:dishId`: Returns all information on a specific dish
- `PUT  /api/dishes/:dishId`: Updates a specific dish
- `POST /api/dishes`: Creates a new dish

To help you creating the database, there are 2 files with some data: _data/dishes.json_ and _data/ingredients.json_


## Iterations

### Iteration 1: Creating your first endpoint

To start, you will create an endpoint to list all dishes.

For that, you can:
- Create a new _server_ folder and create a new Express project inside it
- Create your models `Dish` and `Ingredient`
- Populate your database with _data/dishes.json_ and _data/ingredients.json_ 
- Create the endpoint `GET /api/dishes`.

At the end of this iteration, you should see the following result when you go on  `localhost:3000/api/dishes`:
```json
[
  {
    "_id": "598c147d82ff710a38fd6027",
    "name": "Pizza",
    "image": "https://i.imgur.com/eTmWoAN.png"
  },
  {
    "_id": "598c147d82ff710a38fd6029",
    "name": "Sweet Potato",
    "image": "https://i.imgur.com/hGraGyR.jpg"
  },
  ...
]
```
