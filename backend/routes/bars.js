const router = require('express').Router();
const Bar = require('../models/bar.model');

router.route('/').get((req, res) => {
    Bar.find()
    .then(bars => res.json(bars))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const hotness = req.body.hotness;
    const location = req.body.location;
    const id = req.body.id;
    const users = req.body.users;

    const newBar = new Bar({
        hotness,
        location,
        id,
        users,
    });

    newBar.save()
    .then(() => res.json('Bar added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Bar.findById(req.params.id)
    .then(bar => res.json(bar))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Bar.findByIdAndDelete(req.params.id)
    .then(() => res.json('Bar deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Bar.findByIdAndUpdate(req.params.id, {
        hotness: req.body.hotness,
        location: req.body.location,
        id: req.body.id,
        users: req.body.users,
    })
    .then(() => res.json('Bar updated!'))
    .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/poi/:id').get((req, res) => {
    Bar.find({ id: req.params.id})
    .then(bar => res.json(bar))
    .catch(err => res.status(400).json('Error: ' + err));
});



module.exports = router;