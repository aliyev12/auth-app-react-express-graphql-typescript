import graphql from 'graphql';
const { GraphQLObjectType } = graphql;

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType'
});

export { RootQueryType };
