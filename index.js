// Require needed packages
require('dotenv').config()
let express = require('express')
let cors = require('cors')
let morgan = require('morgan')
let expressJwt = require('express-jwt')
let rowdyLogger = require('rowdy-logger')

// Instantiate app
let app = express()
let rowdyResults = rowdyLogger.begin(app)

// Set up middleware
app.use(morgan('dev'))

app.use(cors())
  // ADD REACT APP FOR CORS HERE
  // origin: 'https://myreactapp.herokuapp.com'


app.use(express.urlencoded({ extended: false })) // Accept form data
app.use(express.json()) // Accept data from fetch (or any AJAX call)

// Routes
app.use('/auth', require('./dist/controllers/auth'))
app.use('/profile', expressJwt({secret: process.env.JWT_SECRET}), require('./dist/controllers/profile'))
app.use('/classes', require('./dist/controllers/classes'))
app.use('/assignments', require('./dist/controllers/assignments'))

app.get('/', (req,res) => {
  res.send({ message: "Welcome to the base route!"})
})
app.get('*', (req, res) => {
  res.status(404).send({ message: 'Not Found' })
})

app.listen(process.env.PORT || 3000, () => {
  rowdyResults.print()
})
