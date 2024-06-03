const express = require('express')
const app = express()

const route = require('./routes/client/index.route')
const routeAdmin = require('./routes/admin/index.route')
const database = require('./config/database')
const systemConfig = require('./config/system')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const flash = require('express-flash')
const cookieParser = require("cookie-parser")
const session = require("express-session")
require('dotenv').config()

const port = process.env.port

database.connect()

app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static(`${__dirname}/public`))
app.set('views', `${__dirname}/views`)
app.set('view engine', 'pug')

// Flash
app.use(cookieParser('namamn'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());
// End Flash

app.use(methodOverride('_method'))

// App local
app.locals.prefixAdmin = systemConfig.prefixAdmin


// Router
route(app)
routeAdmin(app)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})