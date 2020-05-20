let mongoose = require('mongoose')
require('dotenv')

mongoose.connect(process.env.MONGODB_URI ||'mongodb://localhost/school', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

module.exports.Class = require('./class')
module.exports.User = require('./user')
module.exports.Assignment = require('./assignment')
