const mongoose = require("mongoose");

const dataSchema= mongoose.Schema({
    id: String,
    carta: String,
    quantidade: Number,
    location: Number,
    floor: Number,
    tipo: String,
    id_cliente: String,
    messageEmbedid: String,
    farmer: String,
    progress: String,
    farmerEx: String
})

module.exports =  mongoose.model("Data", dataSchema);