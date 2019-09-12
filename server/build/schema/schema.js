"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_1 = require("graphql");
var root_query_type_1 = require("./types/root_query_type");
var mutations_1 = require("./mutations");
exports.schema = new graphql_1.GraphQLSchema({
    query: root_query_type_1.RootQueryType,
    mutation: mutations_1.mutation
});
