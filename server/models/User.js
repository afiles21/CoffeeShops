const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({

    firstName: {
        type: String,
        required: [true, "First Name is required"],
        minLength: [2, "First Name must be at least 2 characters"]
    },

    lastName: {
        type: String,
        required: [true, "Last Name is required"],
        minLength: [2, "Last Name must be at least 2 characters"]
    },

    email: {
        type: String,
        required: [true, "Email is required"],
    },

    password: {
        type: String,
        required: [true, "Password is required"],
        minLength: [8, "Password must be at least 8 characters"]
    }
}, { timestamps: true })

UserSchema.virtual("confirmPassword")
    .get( () => this._confirmPassword )
    .set( value => this._confirmPassword = value );

    //must use function keyword CANNOT USE ARROW FUNCTION
    //must pass next as a parameter
UserSchema.pre('validate', function(next) {
    if(this.password !== this.confirmPassword) {
        this.invalidate("confirmPassword", "Password and Confirm Password must match")
    }
    // anytime using a prehook, must use next()
    // because with a prehook, we are pausing the validate hook to run our function 
    next();
})

// hashing password before saving the user to the database
UserSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 10)
        .then( hash => {
            this.password = hash;
            next();
        })
})

module.exports = mongoose.model("User", UserSchema);