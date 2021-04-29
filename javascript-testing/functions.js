const axios = require("axios")

const functions = {
  add: (num1, num2) => num1 + num2,
  isNull: () => null,
  checkValue: val => val,
  createUser: () => {
    const user = { firstName: "John", lastName: "Sharma" }
    return user
  },
  fetchUser: () =>
    axios
      .get("https://jsonplaceholder.typicode.com/users/1")
      .then(res => res.data)
      .catch(err => "error")
}

// functions.fetchUser().then(data => console.log(data.name))
module.exports = functions
