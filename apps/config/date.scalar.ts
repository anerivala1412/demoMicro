import { GraphQLScalarType } from 'graphql';

export const DATETIME = new GraphQLScalarType({
  name: 'DateTimeScalar',
  description: 'A date and time, represented as an ISO-8601 string',
  serialize: (value) => new Date(value).toUTCString(),
  parseValue: (value) => new Date(value).toUTCString(),
  parseLiteral: (ast: any) => new Date(ast.value).toUTCString(),
});
