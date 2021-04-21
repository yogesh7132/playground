const { TestScheduler } = require("jest")
const functions = require("./functions")

test("Add 2 + 2 equals 4 ", () => {
  expect(functions.add(2, 2)).toBe(4)
})

test("Add 2 + 2 NOT equal 5 ", () => {
  expect(functions.add(2, 2)).not.toBe(5)
})

test("Should be NULL", () => {
  expect(functions.isNull()).toBeNull()
})

test("Should be Falsy", () => {
  expect(functions.checkValue("")).toBeFalsy()
})

test("Should be Truthy", () => {
  expect(functions.checkValue("val")).toBeTruthy()
})
