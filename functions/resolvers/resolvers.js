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
    }
  },
};

module.exports = resolvers;
