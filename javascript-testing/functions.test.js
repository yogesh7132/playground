const functions = require("./functions")

// toBe (for premitive types) - It uses Object.is to test exact equality ------------
test("Add 2 + 2 equals 4 ", () => {
  expect(functions.add(2, 2)).toBe(4)
})

// Not
test("Add 2 + 2 NOT equal 5 ", () => {
  expect(functions.add(2, 2)).not.toBe(5)
})

//Matchers : Truthiness - distinguish between undefined, null, and false -----------

// toBeNull
test("Should be NULL", () => {
  expect(functions.isNull()).toBeNull()
})

// toBeFalsy
test("Should be Falsy", () => {
  expect(functions.checkValue("")).toBeFalsy()
})

// toBeTruthy
test("Should be Truthy", () => {
  expect(functions.checkValue("val")).toBeTruthy()
})

// Check the value of an object ------------------------------------------------

// toEqual (for reference type)
test("User should be John Sharma", () => {
  expect(functions.createUser()).toEqual({ lastName: "Sharma", firstName: "John" })
})

// toStrictEqual
test("User should be John Sharma (strictEqual)", () => {
  expect(functions.createUser()).toStrictEqual({ lastName: "Sharma", firstName: "John" })
})

// Numbers - Most ways of comparing numbers ---------------------------------------

// toBeLessThan
test("Should be under 1600", () => {
  const load1 = 800
  const load2 = 700
  expect(load1 + load2).toBeLessThan(1600)
})

// toBeLessThanOrEqual
test("Should be under 1600", () => {
  const load1 = 800
  const load2 = 800
  expect(load1 + load2).toBeLessThanOrEqual(1600)
})

// toBeGreaterThan
// toBeGreaterThanOrEqual
// toBeCloseTo (for FLOATING POINT equality )

// String - check strings against regular expressions --------------
