const mongoose = require("mongoose");

const dataSchema= mongoose.Schema({
    id_discord: String,
    id_steam: String,
    id_quaver: String
})

module.exports =  mongoose.model("quaverUsers", dataSchema);