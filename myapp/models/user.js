const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('Users',{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            len:[2,20]
        }
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    },
    role:{
        type:DataTypes.STRING,
        allowNull:false,
        defaultValue:'user'
    }

},
{
    timestamps: true, 
}
);

module.exports = User;