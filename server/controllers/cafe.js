const Cafe = require('../models/Cafe');

module.exports = {

    findAll: (req, res) => {
        Cafe.find()
            .then( allCafes => res.json(allCafes))
            .catch( err => res.status(400).json(err))
    },

    findOneCafe: (req, res) => {
        Cafe.findById(req.params.id)
            .then( oneCafe => res.json(oneCafe))
            .catch( err => res.status(400).json(err))
    },

    createCafe: (req, res) => {
        Cafe.create(req.body)
            .then( newCafe => res.json(newCafe))
            .catch( err => res.status(400).json(err))
    },

    editCafe: (req, res) => {
        Cafe.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
            .then( updatedCafe => res.json(updatedCafe))
            .catch( err => res.status(400).json(err))
    },

    deleteCafe: (req, res) => {
        Cafe.findByIdAndDelete(req.params.id)
            .then( result => res.json(result))
            .catch( err => res.status(400).json(err))
    }
}