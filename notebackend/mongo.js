const mongoose = require('mongoose')

// korvaa url oman tietokantasi urlilla. ethän laita salasanaa Githubiin!
if ( process.env.NODE_ENV !== 'production' ) {
  require('dotenv').config()
}

//const url = process.env.MONGODB_URI
const url = process.env.MONGODB_URI
mongoose.connect(url)

const Note = mongoose.model('Note', {
  content: String,
  date: Date,
  important: Boolean
})

const note = new Note({
  content: 'Javascript rules',
  date: new Date(),
  important: true
})

/**note
  .save()
  .then(response => {
    console.log('note saved!')
    mongoose.connection.close()
  })**/

  /**Note
  .find({})
  .then(result => {
    result.forEach(note => {
      console.log(note)
    })
    mongoose.connection.close()
  })**/