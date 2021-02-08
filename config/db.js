const mongoose = require('mongoose')
const config = require('config')
const mongodb = config.get('mongoURL')

const connectDB = async () => {
    try {
        await mongoose.connect(mongodb, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        })
        console.log('Mongo connected')
    } catch (err) {
        console.log(err.message)
        process.exit(1)
    }
}

module.exports = connectDB