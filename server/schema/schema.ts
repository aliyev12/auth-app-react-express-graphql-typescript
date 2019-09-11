import graphql from 'graphql';
import {RootQueryType} from './types/root_query_type';
const { GraphQLSchema } = graphql;

const schema = new GraphQLSchema({
  query: RootQueryType
});

export { schema };
