 const express = require("express");
 const router = express.Router();
 const User = require('../models/User');

 router.get('/', async(req, res) => {
     try {
         const user = await User.find();
         res.json(user);
     } catch (err) {
         res.send('Error' + err)
     }

 });
 //SUBMITS A USER
 router.post('/register', async(req, res) => {
     const user = new User({
         username: req.body.username,
         email: req.body.email,
         password: req.body.password,
         gameId: req.body.gameId,
         findFriends: req.body.findFriends,
         location: req.body.location,
         level: req.body.level

     });
     try {
         const savedPost = await user.save();
         res.json(savedPost);
     } catch (err) {
         res.json({ message: err });
     }
 });

 //SPECIFIC USER
 router.get('/users/:userId', async(req, res) => {
     try {
         const user = await User.findById(req.params.userId);
         res.json(user);
     } catch (err) {
         res.json({ message: err });

     }
 });


 //DELETE USER
 router.delete('/users/:userId', async(req, res) => {
     try {
         const removedUser = await User.remove({ _id: req.params.userId });
         res.json(removedUser);
     } catch (err) {
         res.json({ message: err });
     }
 });
 //UPDATE USER
 router.patch('/users/:userId', async(req, res) => {
     try {
         const updatedUser = await User.updateOne({
             _id: req.params.userId
         }, {
             $set: {
                 username: req.body.username,
                 email: req.body.email,
                 password: req.body.password,
                 gameId: req.body.gameId,
                 findFriends: req.body.findFriends,
                 location: req.body.location,
                 level: req.body.level

             }

         });
         res.json(updatedUser);
     } catch (err) {
         res.json({ message: err });
     }

 });

 // const {
 //     getUsers,
 //     getUser,
 //     createUser,
 //     updateUser,
 //     deleteUser
 // } = require("../controllers/users");
 // const User = require('../models/User');
 // const router = express.Router({
 //     mergeParams: true
 // });

 // router
 //     .route("/")
 //     .get(advancedResults(User), getUsers)
 //     .post(createUser);

 // router
 //     .route("/:id")
 //     .get(getUser)
 //     .put(updateUser)
 //     .delete(deleteUser);

 module.exports = router;