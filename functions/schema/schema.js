const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Project {
    id: ID!
    name: String
    description: String
    employees: [Employee]
  }

  type Employee {
    id: ID!
    name: String
    email: String
    role: String
    projects: [Project]
  }

  type Query {
    employees: [Employee]
    employeeById(id: String!): Employee
    employeeByEmail(email: String!): [Employee]
    projects: [Project]
    projectById(id: String!): Project
  }

  type Mutation {
    addEmployee(
      id: String!
      name: String!
      email: String!
      role: String!
    ): Employee

    addProject(id: String!, name: String!, description: String): Project
  }
`;

module.exports = typeDefs;
