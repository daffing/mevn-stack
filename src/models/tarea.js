const mongoose = require('mongoose')

const Schema = mongoose.Schema

//defining schema
const tarea = new Schema ({
    title: String,
    description: String
})

//creating model
const modelo = mongoose.model('Tarea', tarea);

//importing model
module.exports = modelo