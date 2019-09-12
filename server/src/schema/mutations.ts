import { GraphQLObjectType, GraphQLString } from 'graphql';
import { UserType } from './types/user_type';
import { signup, login, logout } from '../services/auth';

export const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    signup: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(parentValue, { email, password }, req) {
        return signup({ email, password, req });
      }
    },
    logout: {
      type: UserType,
      resolve(parentValue, args, req) {
        return logout({ req });
      }
    },
    login: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(parentValue, { email, password }, req) {
        return login({ email, password, req });
      }
    }
  }
});