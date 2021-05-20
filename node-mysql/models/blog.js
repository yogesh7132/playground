const { Sequelize, DataTypes } = require('sequelize')

const Blog = sequelize.define('Blog', {
    id:{
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    body: {
      type: DataTypes.STRING
    }
})


// This creates the table if it doesn't exist (and does nothing if it already exists)
Blog.sync()
    .then(()=>{
        console.log("Table Created")
    })
    .catch( error =>{
        console.log("Error while creating table", error)
    })

module.exports = Blog