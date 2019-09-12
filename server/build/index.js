"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
// const models = require('./models');
require("./models");
var express_graphql_1 = __importDefault(require("express-graphql"));
var mongoose_1 = __importDefault(require("mongoose"));
var express_session_1 = __importDefault(require("express-session"));
var passport_1 = __importDefault(require("passport"));
// import passportConfig from './services/auth';
// const MongoStore = require('connect-mongo')(session);
var connect_mongo_1 = __importDefault(require("connect-mongo"));
var MongoStore = connect_mongo_1.default(express_session_1.default);
// const schema = require('./schema/schema');
var schema_1 = require("./schema/schema");
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Create a new Express application
var app = express_1.default();
// Replace with your mongoLab URI
var MONGO_URI = process.env.MONGO_URI;
// Mongoose's built in promise library is deprecated, replace it with ES2015 Promise
mongoose_1.default.Promise = global.Promise;
// Connect to the mongoDB instance and log a message
// on success or failure
mongoose_1.default.connect(MONGO_URI);
mongoose_1.default.connection
    .once('open', function () { return console.log('Connected to MongoLab instance.'); })
    .on('error', function (error) { return console.log('Error connecting to MongoLab:', error); });
// Configures express to use sessions.  This places an encrypted identifier
// on the users cookie.  When a user makes a request, this middleware examines
// the cookie and modifies the request object to indicate which user made the request
// The cookie itself only contains the id of a session; more data about the session
// is stored inside of MongoDB.
app.use(express_session_1.default({
    resave: true,
    saveUninitialized: true,
    secret: 'aaabbbccc',
    store: new MongoStore({
        url: MONGO_URI,
        autoReconnect: true
    })
}));
// Passport is wired into express as a middleware. When a request comes in,
// Passport will examine the request's session (as set by the above config) and
// assign the current user to the 'req.user' object.  See also servces/auth.js
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
// Instruct Express to pass on any request made to the '/graphql' route
// to the GraphQL instance.
app.use('/graphql', express_graphql_1.default({
    schema: schema_1.schema,
    graphiql: true
}));
// Webpack runs as a middleware.  If any request comes in for the root route ('/')
// Webpack will respond with the output of the webpack process: an HTML file and
// a single bundle.js output of all of our client side Javascript
// const webpackMiddleware = require('webpack-dev-middleware');
// const webpack = require('webpack');
// const webpackConfig = require('../webpack.config.js');
// app.use(webpackMiddleware(webpack(webpackConfig)));
// module.exports = app;
app.listen(4000, function () {
    console.log('############==== Listening on port 4000 ....');
});
// import express, { Request, Response } from 'express';
// import models from './models';
// import expressGraphQL from 'express-graphql';
// import mongoose from 'mongoose';
// import session from 'express-session';
// import passport from 'passport';
// // import passportConfig from './services/auth';
// import { signup, login } from './services/auth';
// import connectMongo from 'connect-mongo';
// import { schema } from './schema/schema';
// import env from 'dotenv';
// env.config();
// const MongoStore = connectMongo(session);
// const app = express();
// const MONGO_URI = process.env.MONGO_URI;
// mongoose.Promise = global.Promise;
// if (typeof MONGO_URI === 'string') {
//   mongoose.connect(MONGO_URI, { useNewUrlParser: true });
//   mongoose.connection
//     .once('open', () => console.log('Connected to MongoLab instance.'))
//     .on('error', error => console.log('Error connecting to MongoLab:', error));
//     require('./models');
//   // Configures express to use sessions.  This places an encrypted identifier
//   // on the users cookie.  When a user makes a request, this middleware examines
//   // the cookie and modifies the request object to indicate which user made the request
//   // The cookie itself only contains the id of a session; more data about the session
//   // is stored inside of MongoDB.
//   app.use(
//     session({
//       resave: true,
//       saveUninitialized: true,
//       secret: 'aaabbbccc',
//       store: new MongoStore({
//         url: MONGO_URI,
//         autoReconnect: true
//       })
//     })
//   );
// }
// // Passport is wired into express as a middleware. When a request comes in,
// // Passport will examine the request's session (as set by the above config) and
// // assign the current user to the 'req.user' object.  See also servces/auth.js
// app.use(passport.initialize());
// app.use(passport.session());
// // Instruct Express to pass on any request made to the '/graphql' route
// // to the GraphQL instance.
// app.use(
//   '/graphql',
//   expressGraphQL({
//     schema,
//     graphiql: true
//   })
// );
// // Webpack runs as a middleware.  If any request comes in for the root route ('/')
// // Webpack will respond with the output of the webpack process: an HTML file and
// // a single bundle.js output of all of our client side Javascript
// export { app };
