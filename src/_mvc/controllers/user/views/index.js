let db = require('../../db');

 exports.engine = ('hbs')

 exports.before = (req, res, next) => {
    let id = req.params.user_id
    if(!id) return next();

    process.nextTick(() => {
       req.user = db.user[id]
       if(!req.user) return next('route')
    })
 }

 exports.list = (req, res, next) => {
    res.render('list', {users: db.users})
 }

 exports.show = (req, res, next) => {
    res.render('show', {user: req.user})
 };

exports.edit = (req, res, next) => {
    res.render('edit', {user: req.user})
 };

exports.update = (req, res, next) => {
   let body = req.body
   req.user.name = body.user.name
   res.message('Inforamtion has been updated')
   res.redirect('/user/' + req.user.id)
 };