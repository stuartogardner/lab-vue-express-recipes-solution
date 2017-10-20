![ck Logo](https://i.imgur.com/1QgrNNw.png)

# Vue.js & Express API | MyRecipeBook

## Introduction

![](https://camo.githubusercontent.com/38e5628f6fa389ad6f84297ec1bfafb2ee2118b8/68747470733a2f2f73332d65752d776573742d312e616d617a6f6e6177732e636f6d2f69682d6d6174657269616c732f75706c6f6164732f75706c6f61645f61653566646634623732303861386130396532346533306536383234383630662e6a7067)

Cooking is hard, but you know what's harder? Remembering recipes. Remember that one time you made that amazing dish and forgot what ingredients go into it? It's a terrible feeling.

In this exercise, we'll make a an application to keep track of your favorite recipes so you never have this disappointing experience again.

This application can apply to food or dishes, so feel free to alter the language accordingly.


## Instructions

You are going to make from scratch a web application recipe book with two parts: the front-end in Vue.js (Client) and the back-end in Express (Server).

### Client

The users that go on your websites will have access to 4 possible routes:
- `/`: Redirect the user to `/dishes`
- `/dishes`: Display a list of all dishes, with a link 
- `/dishes/:dishId`: Display the recipe of a specific dish, with the descriptions and all it's ingredients
- `/new-dish`: Display a form page to add a new dish

**Example of page seen on "/dishes"**
![/dishes](https://i.imgur.com/qw1ADPz.png)


**Example of page seen on "/dishes/598c147d82ff710a38fd6027"**
![/dishes/:dishId](https://i.imgur.com/SFRNUFe.png)



### Server

You are going to create your own Rest API with Express. For that, 2 models are going to be needed: `Ingredient` and `Dish` 

```javascript
// server/models/ingredient.js
// ...
const IngredientSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  unity: String
});
module.exports = mongoose.model('Ingredient', IngredientSchema);
```

```javascript
// server/models/dish.js
// ...
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
module.exports = mongoose.model('Dish', DishSchema);
```

For your API, you can create the following endpoints:
- `GET  /api/dishes`: Returns all dishes with only their id, names and images
- `GET  /api/dishes/:dishId`: Returns all information on a specific dish
- `PUT  /api/dishes/:dishId`: Updates a specific dish
- `POST /api/dishes`: Creates a new dish

To help you creating the database, there are 2 files with some data: _data/dishes.json_ and _data/ingredients.json_


## Iterations

### Iteration 1 | Initialize and populate your database

To start, you will populate your database based on the _data_ folder.

For that you can:
- Initialize a new Express project inside _starter-code/server/_ folder
- Create your models `Dish` and `Ingredient`
- Populate your database with a _bin/seeds.js_ file based on _data/dishes.json_ and _data/ingredients.json_ 


### Iteration 2 | Creating your first endpoint

Now you will create an endpoint to list all dishes: `GET /api/dishes`.

At the end of this iteration, you should see the following result when you go on  `http://localhost:3000/api/dishes`:
```json5
[
  {
    "_id": "598c147d82ff710a38fd6027",
    "name": "Pizza",
    "image": "https://i.imgur.com/eTmWoAN.png",
    "description": "Pizza is a yeasted flatbread typically topped with tomato sauce and cheese and baked in an oven. It is commonly topped with a selection of meats, vegetables and condimentsc"
  },
  {
    "_id": "598c147d82ff710a38fd6029",
    "name": "Sweet Potato",
    "image": "https://i.imgur.com/hGraGyR.jpg",
    "description": "A salad is a dish consisting of a mixture of small pieces of food, usually featuring vegetables.[1][2] They are typically served at room temperature or chilled, with notable exceptions such as south German potato salad which is served warm. Salads may contain virtually any type of ready-to-eat food."
  },
  //...
]
```


### Iteration 3 | Listing dishes

Having a link to see all dishes in a JSON is a first good step and now we are going to use a Vue application. That's why we are now creating a dishes page (`/dishes`) that will display all dishes in a list, with their names and images.

In that iteration, we recommand you to:
- Initialize a Vue application in _starter-code/client/_ folder
- Create a component that will be displayed on the following path `/dishes` 
- Fetch and display the dishes from `GET /api/dishes`
- Redirect the home page (`/`) to `/dishes`


### Iteration 4 | Show one dish details

You now have a list of dishes, it's time to link them to a detail page.

On your list of dishes page, create a link to `/dishes/:dishId` that displays the name, the image and the description of a specific dish. You should also create an "_Edit description_" button just after your description.


### Iteration 5 | Edit the description of a dish

In this iteration, we are going to edit the description without changing the page!

In term of user experience, the scenario should be the following:
- The user clicks on the "_Edit description_" button
- The text description is changed by a textarea with the description inside it add the button is changed by "_Save description_"
- When the user clicks on "_Save description_", it replaces the textarea by a simple paragraph, the "_Edit description_" button comes back and the new description must be saved

For that, you will probably need to create a `PUT /api/dished/:dishId` endpoint.


### Iteration 6 | List all ingredients

A dish detail page is nice, but we're missing one important piece: *ingredients*.

Over the next two iterations, we're going to add functionality to add ingredients to our dishes.

The first step in doing so is going to be displaying a list of possible ingredients on the recipe's page. For that, you will need to:
- Add an API endpoint `GET /api/ingredients` that displays all ingredients 
- Use this endpoint to display all your ingredients in your dish detail page (`/dishes/:dishId`)

In your list of all ingredients, you should display:
- The ingrendient's **name**
- A number input (will be used in the next iteration)
- The **unity**
- A "Add ingredient" button (will be used in the next iteration)


### Iteration 7 | Add ingredient to dish

Create a function in the single dish component. When someone clicks the "Add ingredient" button from the previous iteration, it should add the ingredient to the dish and display it.

Do 

The request should be done inside of your dish service.

The API endpoint is a POST to `'/drinks/:drinkId/ingredients/:id/add'`. It also takes in a parameter for `quantity` in the body, which is a number.

Add a list of a dish's ingredients to the single dish component. Upon successfully adding the ingredient to the dish, display the ingredient in the list.


### Iteration 8 | Bonus | Creating New Ingredients & Dishes

Create a new route for adding new dishes. Add a link in the home page to display a form. This form will make a POST request to `/dishes` with a `name`, `image`, and `description`.

In addition, create a route on the home page to display a form to create a new ingredient. The route is a POST to `/ingredients`, and takes a `name`, `image`, and `description` in the body.



## Solution

You will find the solution inside the folder "_solution-code-XX_" where "_XX_" is the number of the iteration.

### Iteration 1 | Solution | Populate your database

You have two ways to populate your databse:
1. Use `mongoinsert` to import your documents: 
    - `$ mongoimport -d lab-vue-express-recipes -c dishes --file data/dishes.json --jsonArray`
    - `$ mongoimport -d lab-vue-express-recipes -c ingredients --file data/ingredients.json --jsonArray`
2. Use a seed file

The second option takes more time but this is what we are going to see. We will also start to create the express project with our `Dish` and `Ingredient` models.


You should do these commands:
```bash
$ git clone https://github.com/ta-web-paris/lab-vuejs-express-recipes.git
$ cd lab-vuejs-express-recipes
$ cd starter-code
$ express --git server
destination is not empty, continue? [y/N] y
```

The last command is creating an Express project inside the "_server_" folder (that already exists but that is empty) and add a "_.gitignore_" file (`--git`).

You can add the `dev` script inside your "_server/package.json_"

```json
"scripts": {
  "start": "node ./bin/www",
  "dev": "nodemon ./bin/www"
}
```

So now, you can install your dependencies and run your project with Nodemon:
```
$ cd server
$ npm install
$ npm run dev
```

Now, your project should run on port 3000 (the port is defined in "_server/bin/www_"). You can check it by going on [http://localhost:3000](http://localhost:3000).


We are now ready to create our models `Dish` and `Ingredient` inside _starter-code/server/models/_. 

```javascript
// ----- server/models/ingredient.js ----- 
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const IngredientSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  unity: String
});
module.exports = mongoose.model('Ingredient', IngredientSchema);
```

```javascript
// ----- server/models/dish.js ----- 
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
module.exports = mongoose.model('Dish', DishSchema);
```


```javascript
// ----- server/bin/seeds.js ----- 
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
```

You can also update your _server/package.json_ to add a script to run the seeds.

```json
  "scripts": {
    "start": "node ./bin/www",
    "dev": "nodemon ./bin/www",
    "seeds": "node ./bin/seeds.js"
  },
```

Don't forget to import mongoose with NPM:
```bash
$ npm install mongoose --save
```

Now you should only run `$ npm run seeds` to populate your database :)


### Iteration 2 | Solution | Creating your first endpoint

Before creating an endpoint to list all dishes (`GET /api/dishes`), we will start with a more basic one (`GET /`) that only renders `{ "text": "Hello world!" }`.


At the moment, you have a regular Express application that displays some views. We are going to remove all the views and send JSON for our REST API.

First, remove "_server/public/_", "_server/views/_" and "_server/routes/users.js_".

Then, in "_server/app.js_", remove the following lines that we don't need anymore:
```javascript
var favicon = require('serve-favicon');
var users = require('./routes/users');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use('/users', users);
```

After that, remove all the `res.render` you can find (that tries to render some views). There is one at the end of "_server/app.js_" and in "_server/routes/index.js_". Change them with the following code:
```javascript
// ----- server/app.js ----- 
// error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: req.app.get('env') === 'development' ? err : {}
  });
});
```

```javascript
// ----- server/routes/index.js ----- 
/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({ text: "Hello world!" });
});
```

Now, if you go to [http://localhost:3000](http://localhost:3000) or [http://localhost:3000/wrongUrl](http://localhost:3000/wrongUrl), you should see the following JSON
```json
{
  "text": "Hello world!"
}
```
```json
{
  "message": "Not Found",
  "error": {
    "status": 404
  }
}
```

Now we have a working basic REST API that handle the request `GET /`!

Let's create an endpoint `GET /api/dishes`. We need to connect with mongoose in our _server/app.js_ and we will need to add a new route in _server/routes/index.js_.

```javascript
// ----- server/app.js ----- 
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/lab-vue-express-recipes', {useMongoClient: true});
// ...
```

```javascript
// ----- server/routes/index.js ----- 
// ...
/* GET all dishes */
router.get('/api/dishes', function(req, res, next) {
  Dish.find({}).exec((err, dishes) => {
    if (err) {
      next(err);
    }
    res.json(dishes); 
  })
});
```

Now if you go to [http://localhost:3000/api/dishes](http://localhost:3000/api/dishes), you will see your list of dishes!


### Iteration 3 | Solution | Listing dishes
WIP


### Iteration 4 | Solution | Show one dish details
WIP


### Iteration 5 | Solution | Edit the description of a dish
WIP


### Iteration 6 | Solution | List all ingredients
WIP


### Iteration 7 | Solution | Add ingredient to dish
WIP

