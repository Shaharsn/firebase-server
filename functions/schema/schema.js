const { gql } = require("apollo-server-express");

const typeDefs = gql`

input ProjectInput {
    id: ID!
    name: String
    description: String
  }

  input EmployeeInput {
    id: ID!
    name: String
    email: String
    role: String
  }

  input EmployeesWithProjects {
    id: ID!
    projects: [ProjectInput]!
  }

  input ProjectsWithEmployees {
    id: ID!
    employees: [EmployeeInput]!
  }

  input EmployeeInput {
    id: ID!
    name: String
    email: String
    role: String
  }

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
    addEmployee(id: String!, name: String!, email: String!, role: String!): Employee
    addProject(id: String!, name: String!, description: String): Project

    updateEmployee(id: String!, name: String, email: String, role: String): Employee
    updateProject(id: String!, name: String, description: String): Project

    deleteEmployee(id: String!): Employee
    deleteProject(id: String!): Project

    updateEmployeeProjects(employeesWithProjects: [EmployeesWithProjects!]): [Employee]
    updateProjectEmployees(projectsWithEmployees: [ProjectsWithEmployees!]): [Project]
  }
`;

module.exports = typeDefs;
