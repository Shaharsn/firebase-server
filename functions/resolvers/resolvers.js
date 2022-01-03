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
        .then((val) => Object.keys(val).map((key) => val[key])),

    projects: () =>
      admin
        .database()
        .ref("projects")
        .once("value")
        .then((snap) => snap.val())
        .then((val) => Object.keys(val).map((key) => val[key])),

    employeeById: (parent, args, context, info) =>
      admin
        .database()
        .ref("employees")
        .child(args.id)
        .once("value")
        .then((snap) => snap.val()),

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
  },
};

module.exports = resolvers;
