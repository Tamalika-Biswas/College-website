const mongoose= require('mongoose')

const DB = process.env.DATABASE

mongoose.connect(DB).then(() => {
    console.log(`connection successful to main db`)
  }).catch((err) => console.log('no connection-maindb'))
  

