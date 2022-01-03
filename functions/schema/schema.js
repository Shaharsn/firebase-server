const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Employee {
    id: ID!
    name: String
    email: String
    role: String
  }
  type Query {
    employees: [Employee]
  }
  type Mutation {
    addEmployee(
      id: String!
      name: String!
      email: String!
      role: String!
    ): String
  }
`;

module.exports = typeDefs;
