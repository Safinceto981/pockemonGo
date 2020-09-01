const express = require('express');
const router = express.Router();
const validateRegisterInput = require('../validation/register');
const User = require('../models/Users');

//GET BACK ALL THE USERS
router.get('/', async (req, res) => {

    try {
        const register = await User.find();
        res.json(register);
    } catch (err) {
        res.json({ message: err });

    }
});


// SUBMITS A USER
router.post('/', async (req, res) => {

    //form validation
    const { erors, isValid } = validateRegisterInput(req.body);

    //  TODO:  Check if else is needed in the func below

    User.findOne({ email: req.body.email }).then(user => {
        if (user) res.status(400).json({ email: 'Email already exists' });

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
});

//  SPECIFIC USER
router.get('/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        res.json(user);
    } catch (err) {
        res.json({ message: err });

    };
}
);
router.delete('/:userId', async (req, res) => {
    try {
        const removedUser = await User.remove({ _id: req.params.userId });
        res.json(removedUser);
    } catch (err) {
        res.json({ message: err });
    }
});
//UPDATE USER
router.patch('/:userId', async (req, res) => {
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

