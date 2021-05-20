const {Sequelize} = require("sequelize");

const sequelize = new Sequelize('blog_app',"root","password",{
    host: 'localhost',
    dialect: 'mysql'
});

const connectDb = async()=>{
    try{
        await sequelize.authenticate()
        console.log("Connection Open")
    }catch(error){
        console.log("Connection Failed",error)
    }
}

module.exports = connectDb
global.sequelize = sequelize