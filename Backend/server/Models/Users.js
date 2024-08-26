const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UsersSchema = new Schema({
    id: { type: Number, require: false },
    name: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: Number, require: true }

},
    {
        collection: "Users",
        timestamps: true
    }
)
const Users = mongoose.model("Users", UsersSchema)

module.exports = Users;