const { Schema, model } = require("mongoose")

const BookSchema = Schema({
  value_1: String,
  value_2: String 

})

module.exports = model('Data', BookSchema)