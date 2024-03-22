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
    res.render('show', {users: db.users})
 };

exports.edit = (req, res, next) => {
    res.render('edit', {users: db.users})
 };