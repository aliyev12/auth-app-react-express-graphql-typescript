"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_1 = require("graphql");
var user_type_1 = require("./types/user_type");
var auth_1 = require("../services/auth");
exports.mutation = new graphql_1.GraphQLObjectType({
    name: 'Mutation',
    fields: {
        signup: {
            type: user_type_1.UserType,
            args: {
                email: { type: graphql_1.GraphQLString },
                password: { type: graphql_1.GraphQLString }
            },
            resolve: function (parentValue, _a, req) {
                var email = _a.email, password = _a.password;
                return auth_1.signup({ email: email, password: password, req: req });
            }
        },
        logout: {
            type: user_type_1.UserType,
            resolve: function (parentValue, args, req) {
                return auth_1.logout({ req: req });
            }
        },
        login: {
            type: user_type_1.UserType,
            args: {
                email: { type: graphql_1.GraphQLString },
                password: { type: graphql_1.GraphQLString }
            },
            resolve: function (parentValue, _a, req) {
                var email = _a.email, password = _a.password;
                return auth_1.login({ email: email, password: password, req: req });
            }
        }
    }
});
