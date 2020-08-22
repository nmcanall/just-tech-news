const {Model, DataTypes} = require("sequelize");
const sequelize = require("../config/connection");

class Vote extends Model {}

Vote.init(
    // Vote table columns have ID, User ID, and the Post ID the user voted on
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "user",
                key: "id"
            }
        },
        post_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "post",
                key: "id"
            }
        }
    },

    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: "vote"
    }
)

module.exports = Vote;