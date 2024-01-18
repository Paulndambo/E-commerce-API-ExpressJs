const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const Schema = mongoose.Schema

const UserSchema = new Schema({
    first_name: {
        type: String, 
        required: [true, "first name cannot be empty"],
        minlength: 3, 
        maxlength: 255
    },
    last_name: {
        type: String, 
        required: [true, "last name cannot be empty"],
        minlength: 3, 
        maxlength: 255
    },
    email: {
        type: String,
        required: [true, "Email cannot be empty"],
        match: [
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
            "Please provide a valid email"
        ],
        unique: [true, "Email must be unique"]
    },
    password: {
        type: String, 
        required: [true, "Password cannot be empty"], 
        minlength: 5, 
        maxlength: 255
    },
    token: {
        type: String,
        required: false,
        minlength: 3,
        maxlength: 500
    },
    createdAt: { type: Date, default: Date.now},
    role: {type: String, default: "customer", minlength: 3, maxlength: 255}
})

UserSchema.pre("save", async function(next) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next()
})

UserSchema.methods.createJWT = function () {
    return jwt.sign({userId:this._id, name: this.first_name, role: this.role}, 'jwtSecret', {expiresIn: '30d'})
}

UserSchema.methods.comparePassword = async function(candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password)
    return isMatch
}

module.exports = mongoose.model("User", UserSchema)