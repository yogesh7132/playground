const { TestScheduler } = require("jest")
const functions = require("./functions")

test("Add 2 + 2 equals 4 ", () => {
  expect(functions.add(2, 2)).toBe(4)
})
