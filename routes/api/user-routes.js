const router = require('express').Router();
//'User' comes from 'db.User', so we destructure it
const { User } = require('../../models');
 
// GET /api/users
router.get('/', (req, res) => {
  //access our user model and run .findAll() method
  User.findAll({
    //expcludes the password from returning
    attributes: { exclude: ['password'] }
  })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

//GET /api/users/1
router.get('/:id', (req, res) => {
  User.findOne({
    attributes: { exclude: ['password'] },
    where: {
      id: req.params.id
    }
  })
    .then(dbUserData => {
      if(!dbUserData){
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err =>{
      console.log(err);
      res.status(500).json(err);
    });
});

//POST /api/users
router.post('/', (req, res) => {
  //expects {username: <value>, email: <value>, password: <value>}
  User.create(
    {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    }
  )
    .then(dbUserData=>res.json(dbUserData))
    .catch(err=>{
      console.log(err);
      res.status(500).json(err);
    });
});

//POST /api/users/login
router.post('/login', (req, res) => {
  //expects req.body={email: <value>, password: <value>}
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(dbUserData=>{
      if(!dbUserData){
        res.status(400).json({ message: 'No user with that email adress' });
        return;
      }
      // res.json({ user: dbUserData });
      //verify the user using the instance method, returns a true or false
      const validPassword = dbUserData.checkPassword(req.body.password);
      if(!validPassword){
        res.status(400).json({ message: 'Incorrect password' });
        return;
      }
      res.json({ user: dbUserData, message: 'You are now logged in' })
    });
});

//PUT /api/users/1
router.put('/:id', (req, res) => {
  //expects req.body={username: <value>, email: <value>, password: <value>}
    //if req.body has exact key/value pairs to match the model, you can just use 'req.body' idstead
  User.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id
    }
  })
    .then(dbUserData=>{
      if(!dbUserData[0]){
        res.status(400).json({ message: 'No user found with this id' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err=>{
      console.log(err);
      res.status(500).json(err);
    });
});

//DELETE /api/users/1
router.delete('/:id', (req, res) =>{
  User.destroy(
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then(dbUserData=>{
      if(!dbUserData){
        res.status(400).json({ message: 'No user found wwith this id' });
        return;
      }
    })
    .catch(err=>{
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;