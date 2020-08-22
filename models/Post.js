const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

// Create Post model
class Post extends Model {}

Post.init(
    // Define columns of Post table
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        post_url: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isURL: true
            }
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "user",
                key: "id"
            }
        }
    },

    // Model configuration settings
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: "post"
    }
);

module.exports = Post;