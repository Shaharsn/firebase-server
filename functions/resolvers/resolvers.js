// Connect to firebase database
const admin = require("../database/database");

const resolvers = {
  Query: {
    employees: () =>
      admin
        .database()
        .ref("employees")
        .once("value")
        .then((snap) => snap.val())
        .then((valuesMap) => {
          if (valuesMap) {
            return Object.keys(valuesMap).map((key) => valuesMap[key]);
          } else {
            return null;
          }
        }),

    employeeById: (parent, args, context, info) =>
      admin
        .database()
        .ref("employees")
        .child(args.id)
        .once("value")
        .then((snap) => snap.val()),

    employeeByEmail: (parent, args, context, info) =>
      admin
        .database()
        .ref("employees")
        .orderByChild("email")
        .equalTo(args.email)
        .once("value")
        .then((snap) => snap.val())
        .then((valuesMap) => {
          if (valuesMap) {
            return Object.keys(valuesMap).map((key) => valuesMap[key]);
          } else {
            return null;
          }
        }),

    projects: () =>
      admin
        .database()
        .ref("projects")
        .once("value")
        .then((snap) => snap.val())
        .then((val) => Object.keys(val).map((key) => val[key])),

    projectById: (parent, args, context, info) =>
      admin
        .database()
        .ref("projects")
        .child(args.id)
        .once("value")
        .then((snap) => snap.val()),
  },

  Mutation: {
    addEmployee: (parent, args, context, info) => {
      admin.database().ref("employees").child(args.id).set({
        id: args.id,
        name: args.name,
        email: args.email,
        role: args.role,
      });

      return args;
    },

    addProject: (parent, args, context, info) => {
      admin.database().ref("projects").child(args.id).set({
        id: args.id,
        name: args.name,
        description: args.description,
      });

      return args;
    },

    updateEmployee: (parent, args, context, info) => {
      admin.database().ref("employees").child(args.id).update({
        id: args.id,
        name: args.name,
        email: args.email,
        role: args.role,
      });

      return args;
    },

    updateProject: (parent, args, context, info) => {
      admin.database().ref("projects").child(args.id).update({
        id: args.id,
        name: args.name,
        description: args.description,
      });

      return args;
    },

    deleteEmployee: (parent, args, context, info) => {
      admin.database().ref("employees").child(args.id).remove();

      return {id: args.id};
    },

    deleteProject: (parent, args, context, info) => {
      admin.database().ref("projects").child(args.id).remove();

      return {id: args.id};
    },

    updateEmployeeProjects:(parent, args, context, info) => {

      args.employeesWithProjects.forEach((emp) => {
        let updatedProjectList = [];

        emp.projects.forEach(proj => {
          updatedProjectList.push({
            id: proj.id, name: proj.name, description: proj.description
          });
        });

        admin.database().ref("employees").child(emp.id).update({
          projects: updatedProjectList
        });
      });

      return args.employeesWithProjects;
    },

    updateProjectEmployees:(parent, args, context, info) => {

      args.projectsWithEmployees.forEach((proj) => {
        let updatedEmployeesList = [];

        proj.employees.forEach(emp => {
          updatedEmployeesList.push({
            id: emp.id, name: emp.name, email: emp.email, role: emp.role
          });
        });

        admin.database().ref("projects").child(proj.id).update({
          employees: updatedEmployeesList
        });
      });

      return args.projectsWithEmployees;
    },
  },
};

module.exports = resolvers;
