const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = (sequelize, DataTypes) =>{
    const User = sequelize.define("User",{
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.VIRTUAL,  //virtual types are only present in the model and they don't appear in the database
        password_hash: DataTypes.STRING,
    },{
        hooks:{
            beforeSave: async user =>{
                if(user.password){
                    user.password_hash = await bcrypt.hash(user.password, 8);
                }
            }
        }
    });

    // By using prototype here you add the function to this model
    // Also, cannot be arrow function because access to "this" is needed
    User.prototype.checkPassword = function(password) {
        return bcrypt.compare(password, this.password_hash);
    }

    User.prototype.generateToken = function(){
        return jwt.sign({id:this.id}, process.env.APP_SECRET)
    }

    return User;
}