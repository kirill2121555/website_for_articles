const express = require('express')
require('dotenv').config()
const mongoose = require('mongoose')
const path = require('path')
const router = require('./routers/router')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const errorMiddleware = require('./middlewares/error-middleware')
const passport = require('passport');
const swaggerUi = require('swagger-ui-express'); 
const swaggerDocument = require('./Swagger.json'); 

const PORT = process.env.PORT || 5000

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({ credentials: true, origin: process.env.HOST }));
app.use(passport.initialize())
app.use('/images', express.static('images'))
app.use('/', router)
app.set('views', path.join(__dirname, 'views'));
app.use(errorMiddleware);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


const start = async () => {
    try {
        await mongoose.connect(process.env.link)
        app.listen(PORT, () => console.log('server started'))

    } catch (e) {
        console.log(e)
    }
}

start()
module.exports.app = app;