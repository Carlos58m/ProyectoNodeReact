const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MoviesSchema = new Schema({
    id: { type: Number, require: true },
    name: { type: String, require: true },
    creator: { type: String, require: true },
    rating: { type: Number, require: true },
    dates: { type: Date, require: true }
},
    {
        collection: "Movies",
        timestamps: true
    }
)
const Movies = mongoose.model("Movies", MoviesSchema)

module.exports = Movies;