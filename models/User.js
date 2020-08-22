const bcrpyt = require("bcrypt");
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Create User model
class User extends Model {

    // Allow ability to check password on a single instance of User
    checkPassword(loginPw) {
        return bcrpyt.compareSync(loginPw, this.password);
    }

}

// Define table columns and configuration
User.init(
    // Table column definitions
    {
        // Define ID column
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },

        // Define username column
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },

        // Define email column
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            // Can only use validate if allowNull is false
            validate: {
                isEmail: true
            }
        },

        // Define password column
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [4] // means password must be at least 4 characters long
            }
        }
    },
    
    // Table configuration options
    {
        // Hooks object for password hashing
        hooks: {
            // Create password hashing BEFORE User is created
            async beforeCreate(newUserData) {
                newUserData.password = await bcrpyt.hash(newUserData.password, 10);
                return newUserData;
            },
            // Create password hashing when a User changes a password
            async beforeUpdate(updatedUserData) {
                updatedUserData.password = await bcrpyt.hash(updatedUserData.password, 10);
                return updatedUserData;
            }
        },
        // sequelize connection
        sequelize,
        // Don't build createdAt/updatedAt fields
        timestamps: false,
        // Don't pluralize name of database table
        freezeTableName: true,
        // Use underscores instead of camel-case
        underscored: true,
        // Make model name lowercase in the database
        modelName: "user"
    }
);

module.exports = User;