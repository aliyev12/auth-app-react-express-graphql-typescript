"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_1 = require("graphql");
var user_type_1 = require("./user_type");
var RootQueryType = new graphql_1.GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: user_type_1.UserType,
            resolve: function (parentValue, args, req) {
                return req.user;
            }
        }
    }
});
exports.RootQueryType = RootQueryType;
