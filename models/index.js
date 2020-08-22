const User = require('./User');
const Post = require('./Post');
const Vote = require('./Vote');

// Define one user to many posts framework
User.hasMany(Post, {
    foreignKey: "user_id"
});

// Define one post to a single user
Post.belongsTo(User, {
    foreignKey: "user_id"
});

// Define many users to vote on many posts
User.belongsToMany(Post, {
    through: Vote,
    as: "voted_posts",
    foreignKey: "user_id"
});

// Define many posts to have votes from many users
Post.belongsToMany(User, {
    through: Vote,
    as: "voted_posts",
    foreignKey: "post_id"
});

// Define that a Vote can be made by a single User
Vote.belongsTo(User, {
    foreignKey: "user_id"
});

// Define that a Vote can be for a single Post
Vote.belongsTo(Post, {
    foreignKey: "post_id"
});

// Define that a User can vote on many post
User.hasMany(Vote, {
    foreignKey: "user_id"
});

// Define that a Post can have many votes
Post.hasMany(Vote, {
    foreignKey: "post_id"
});

module.exports = {User, Post, Vote};