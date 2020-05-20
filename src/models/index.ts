let mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/school', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

module.exports.Class = require('./class')
module.exports.User = require('./user')
module.exports.Assignment = require('./assignment')
