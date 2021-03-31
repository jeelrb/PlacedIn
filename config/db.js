const mongoose = require('mongoose')
const config = require('config')
const mongodb = config.get('mongoURL')

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
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