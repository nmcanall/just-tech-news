const User = require('./User');
const Post = require('./Post');

// Define one user to many posts framework
User.hasMany(Post, {
    foreignKey: "user_id"
});

// Define one post to a single user
Post.belongsTo(User, {
    foreignKey: "user_id"
});

module.exports = { User, Post };