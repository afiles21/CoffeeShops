const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost/coffee_shop_tracker", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then( () => console.log("Connected to the database"))
    .catch( err => console.log("There was an error connecting to the database", err))
    