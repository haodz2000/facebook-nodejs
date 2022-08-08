const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet')
const dotenv = require('dotenv')
const app = express();
const route = require('./routes');
const cors = require('cors')
const database = require('./config/db');


dotenv.config()
//Connect database
database.connect();

app.use(cors());
app.use(express.json());

//HTTP Logger
app.use(helmet())
app.use(morgan('common'))

//route
route(app)

app.listen(process.env.PORT||5000,()=>{
    console.log("Server is running")
})