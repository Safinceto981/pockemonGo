const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const mongoose = require('mongoose');
//const router = require('./modules/users/routes/user');

//
const MONGODB = 'mongodb+srv://safi981:safi981@cluster1.oa7aa.mongodb.net/Cluster1?retryWrites=true&w=majority';

mongoose.connect(MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected');
});
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

//routes
app.get('/', (req, res) => {
    res.send('WE are on home');
});
app.get('/login', (req, res) => {
    res.sendFile('/home/safinceto981/Desktop/PockemonApi/views/login.html');
});
app.get('/register', (req, res) => {
    res.sendFile('/home/safinceto981/Desktop/PockemonApi/views/register.html');
    // res.sendfile('./routes/register');
});
app.use(express.json());
const register = require('./modules/users/routes/user');
app.use('/', register);

app.get('/welcome',
    function(req, res) {

        res.sendFile('welcome');
    });

// app.get('/articles/add', function(req, res) {
//     res.render('add_article', {
//         title: 'add article'

//     });
// });

//SUBMITS A USER
router.post('/', async(req, res) => {
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


app.listen(3005, function() {
    console.log('Server started on port 3005');
});