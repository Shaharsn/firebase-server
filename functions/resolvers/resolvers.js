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
    addEmployee: (id, name, email, role) =>
      admin.database().ref("contacts").push({
        id: id,
        name: name,
        email: email,
        role: role,
      }).key,
  },
};

module.exports = resolvers;
