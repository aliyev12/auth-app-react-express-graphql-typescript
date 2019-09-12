import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID
} from 'graphql';

export const UserType = new GraphQLObjectType({
  name: 'UserType',
  fields: {
    id: { type: GraphQLID },
    email: { type: GraphQLString }
  }
});