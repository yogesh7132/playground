const functions = {
  add: (num1, num2) => num1 + num2,
  isNull: () => null,
  checkValue: val => val,
  createUser: () => {
    const user = { firstName: "John", lastName: "Sharma" }
    return user
  }
}

module.exports = functions
