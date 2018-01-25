<h1 align="center">Cinema-Theater-App</h1>

### Application for buying tickets for a cinema theater 📽

**Information**: Backend application with an external REST API for the clients.
**Technology used**: Node.js, Express.js, MongoDB and mongoose.js.

## Getting started

To get the Node server running locally:

* Clone this repo
* Set up MongoDB locally. [Link](https://www.mongodb.com/download-center?jmp=nav#community) to get started (Click on 'Community Server' Tab to download) > If you have homebrew in your machine, use the following command in your Terminal: `brew install mongodb`. And then activate it with the command: `brew services start mongodb`.
* `npm install` to install all the dependencies
* `node index.js` to start the local server (You will see logged in your console 'Server listening')

# Code Overview

## Dependencies

> This is only information about the dependencies used in the project. Using the command `npm install` they will all be installed, as they are already defined in the package.json file.

* [expressjs](https://github.com/expressjs/express) - Light-weight web application framework
* [mongoose](https://github.com/Automattic/mongoose) - For modeling and mapping MongoDB data to javascript
* [mongoose-validator](https://github.com/leepowellcouk/mongoose-validator) - Validators for Mongoose schemas
* [body-parser](https://github.com/expressjs/body-parser) - Node.js body parsing middleware
* [node-config](https://github.com/lorenwest/node-config) - Organizes hierarchical configurations for your app deployments
* [cookie-parser](https://github.com/expressjs/cookie-parser) - Parses cookies and puts the cookie information on req object in the middleware
* [faker](https://github.com/Marak/Faker.js) - for generating fake data for seeding the database and tests
* [pug](https://github.com/pugjs/pug) - high-performance template engine implemented with JavaScript for Node.js and browsers
* [ava](https://github.com/avajs/ava) - Test runner
* [nyc](https://github.com/istanbuljs/nyc) - Command line interface to use with AVA
* [supertest](https://github.com/visionmedia/supertest) - Provides a high-level abstraction for testing HTTP

## Application Structure

* `index.js` - entry point of our application.

* `app.js`- defines our express server and the Error Handling middelware.

* `database-connection.js`- defines the connection to our MongoDB database.

* `routes/` - This folder contains the routes definitions for our API.

* `models/` - This folder contains the models used in our application, using Mongoose schema definitions.

* `services/` - Contains the files where we define the methods to connect to our database.

* `views/`- The view files of our application using the pug template.

* `ìndex.html` - This html file will define our main view structure to be afterwards modelated by our different pug views. Here we will also use the axios script that will allow us to make real post and get requests to our database from the console.

## Error Handling

In the file `app.js` we define our error-handling middleware for handling any possible error in our application and be able to show error messages that the user/client can understand.

> Every Error ocurred at the database or Schema level will be propagated until this stage to be properly handled.

We will consider different types of error:

* `409` -

* `422` -

* `500` -

## Usage

We can use Axios or Postman to make our different get or post requests to communicate with our database.

Example of the usage of axios in the chrome console:

### Get list of customers

`GET`

```
/theater/customer/all
```

### Add a new customer

`POST`

```
/theater/customer/
```

The information of the user will be defined on the body request.
Example:

```
{ firstName: 'Joan', lastName: 'López', email: 'joanlopez567@gmail.com' }
```

`firstName`, `lastName` and `email` are required fields. If any of the entries are empty or not valid, the user will receive a 422 response with the correct error message.

If there is already an user in the database with the same email, the user will receive a 409 response with the informative error.

### Show details of a customer

`GET`

```
/theater/customer/detail/THE_USER_ID
```

### Get list of all seats

`GET`

```
/theater/seat/all
```

### Get list of available seats

`GET`

```
/theater/seat/available
```

### Show details of a seat

`GET`

```
/theater/seat/detail/THE_SEAT_ID
```

### Make a reservation

`POST`

```
/theater/booking'
```

```
body: { userId: _THE_USER_ID_, seatId: _THE_SEAT_ID_}
```

`userId` and `seatId` are required fields.

If the customer attemt to book a seat, but he/she already has a seat booked or that seat has been booked for any other customer, there will be a 409 response showing the correct error message to the user.

Once the request is made, and if no error is encountered, it will reserve this seat to the sepecified user.

## Helpful Software

* I recommend to use Robomongo (Now called Robo 3T) to manage easily your MongoDB database. Download it [here](https://robomongo.org/).

* It's also recommended to use Axios and Postman to try out and make the get or post requests.
