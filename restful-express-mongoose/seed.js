const mongoose = require("mongoose")
const Product = require("./models/product")

const productArr = [
  {
    name: "Iphone 12",
    price: 100000,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam et minus laudantium!"
  },
  {
    name: "Macbook Air",
    price: 200000,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam et minus laudantium!"
  },
  {
    name: "Drone",
    price: 80000,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam et minus laudantium!"
  },
  {
    name: "Titan Watch",
    price: 70000,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam et minus laudantium!"
  },
  {
    name: "Shoes",
    price: 3000,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam et minus laudantium!"
  },
  {
    name: "T-Shirt",
    price: 800,
    desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam et minus laudantium!"
  }
]

function seed() {
  Product.insertMany(productArr)
    .then(() => {
      console.log("DB Seeded")
    })
    .catch(err => {
      console.log(err)
    })
}

module.exports = seed
