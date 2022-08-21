const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {
    User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:username/:password').get((req, res) => {
    User.find({username: req.params.username, password: req.params.password})
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const bars = req.body.bars;

    const newUser = new User({username, password, bars,});

    newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    User.findByIdAndUpdate(req.params.id, {
        bars: req.body.bars
    })
    .then(() => res.json('User updated!'))
    .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/:id').get((req, res) => {
    User.findById(req.params.id)
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;