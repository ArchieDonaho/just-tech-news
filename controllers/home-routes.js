const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

//use the same GET route as we did with the api routes to get all posts
router.get('/', (req, res) => {
  console.log(req.session);
  Post.findAll({
    attributes: [
      'id', 
      'post_url', 
      'title', 
      'created_at',
      [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
    ],
    order: [['created_at', 'DESC']],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          //includes the username  of the commentor
          model: User,
          attributes: ['username']
        }
      },
      {
        //include the username of the poster
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbPostData => {
      //pass all the post into the homepage
      //use the .map to create a new array with all data serialized
      //use the .get to serialize the data, similar to how res.json() does it automatically
      const posts = dbPostData.map(post => post.get({ plain: true }));
      res.render('homepage', { posts });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

//render the login page
router.get('/login', (req, res) => {
  if(!req.session.loggedIn){
    res.render('login');
  }
})

module.exports = router;