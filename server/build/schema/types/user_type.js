"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_1 = require("graphql");
exports.UserType = new graphql_1.GraphQLObjectType({
    name: 'UserType',
    fields: {
        id: { type: graphql_1.GraphQLID },
        email: { type: graphql_1.GraphQLString }
    }
});
