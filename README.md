# Slow Habits API

## Table of contents
* [Introduction](#introduction)
* [Technologies](#technologies)
* [Project Status](#project-status)
* [Setup](#setup)
* [Usage](#usage)
* [Testing](#testing)



## <a name="introduction"/>  Introduction
Slow habits is an app for users to build habits permanently, focussing on long-term incremental changes, rather than a wholesale overhaul of our current habits.
This is the API for that app, which includes creating and authenticating a user (including salting and hashing passwords), as well as user login. It will handle 
all user data (using mongodb).
  
The frontend will be able to give API request to the server to retrieve and manipulate information  

I am creating this project to further strengthen my skills in __Node__ and __Express__, alongside learning __Typescipt__ and __TDD__ using __Jest__.

## <a name="technologies"/>  Technologies
* Node
* Express
* Typescript
* Jest & SuperTest

## <a name="project-status"/> Project Status
This project is currently under development. It will eventually be used by the frontend I am creating at <a href="https://github.com/JTavinor/slow-habits">this repo</a>.

## <a name="setup"/> Setup
Clone this repo to your desktop (You will need node and npm installed globally on your machine) and run
`
npm install
`
to install all the dependencies.

As connecting to mongoDB requires a connection string that exposes username and password, if you want to try out the API you will have to create a mongoDB cluster and save the connection string as an environment variable by using
```
export DB_CONNECTION_STRING=yourConnectionString
```

## <a name="usage"/> Usage
After you clone this repo to your desktop, go to its root directory and run `npm install` to install its dependencies.

Once the dependencies are installed, you can run `npm start` to start the application. You will then be able to access it at localhost:5000.

I use Postman to test the endpoints.

## <a name="testing"/>  Testing
Part of the motivation for this project was to learn how to code in a TDD style. To this end I have written unit tests __Jest__ and __Supertest__. In order to run these tests simply run `npm test` to run the tests.
