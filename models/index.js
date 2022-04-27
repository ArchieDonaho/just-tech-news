const User = require('./User');
const Post = require('./Post');
const Vote = require('./Vote');
const Comment = require('./Comment');

//define user/post associations
User.hasMany(Post, {
  foreignKey: 'user_id',
});

Post.belongsTo(User, {
  foreignKey: 'user_id',
});

//define vote's associations
User.belongsToMany(Post, {
  through: Vote,
  as: 'voted_posts',
  foreignKey: 'user_id'
});

Post.belongsToMany(User, {
  through: Vote,
  as: 'voted_posts',
  foreignKey: 'post_id'
});

User.hasMany(Vote, {
  foreignKey: 'user_id'
});

Post.hasMany(Vote, {
  foreignKey: 'post_id'
});
//the vote table will have 3 columns. id, user_id, and post_id.
//user_id and post_id will come up multiple times in each column, but cannot have the same matching id's occur twice 
//(aka, a user can only vote once, and a post can only have a user vote once)
//and to get the number of votes on a post, perform a count on the number of times post_id occors
//and to get the amout of votes a user made, perform a count on the number of times user_id occors

//define Comment's associations (one-to-many)
//a single comment belongs to a single post, but a single post can have many comments
//a single comment belongs to a single user, but a user can have many comments
Comment.belongsTo(User, {
  foreignKey: 'user_id'
});

Comment.belongsTo(Post, {
  foreignKey: 'post_id'
});

User.hasMany(Comment, {
  foreignKey: 'user_id'
});

Post.hasMany(Comment, {
  foreignKey: 'post_id'
});

module.exports = { User, Post, Vote, Comment };