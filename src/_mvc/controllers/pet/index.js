let db = require("../../db")

exports.engine = 'ejs'

exports.before = (req, res, next) => {
    let pet = db.pets[req.params.pet_id] 
        if(!pet) 
        return 
            next('route')
        req.pet = pet
            next()
};

exports.show = (req, res, next) => {
    req.render('show', {pet: req.pet})
};

exports.edit = (req, res, next) => {
    req.render('edit', {pet: req.pet})
};

exports.update = (req, res, next) => {
    let body = req.body
    req.pet.name = body.pet.name
    res.message("information updated")
    res.redirect('/pet/' + req.pet.id)
}