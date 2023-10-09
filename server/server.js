const express = require('express')
const cors = require('cors')
const app = express()
const cookieParser = require('cookie-parser');
require('dotenv').config()

app.use(
    cors({
        credentials: true,
        origin: 'http://localhost:5173',
    }),
    express.json(),
    express.urlencoded({ extended: true }),
    cookieParser()
)

// require config
require('./config/mongoose');
//require routes
require('./routes/cafe')(app);
require('./routes/user')(app);

app.listen(8000, () => console.log("Server listening on port 8000"));