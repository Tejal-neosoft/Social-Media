import mongoose from 'mongoose';

export const connection = async () => {
    try {
        await mongoose.connect(process.env.DB, {
            useNewUrlParser: true
        })
        console.log("mongo connected")
    }
    catch (error) {
        console.log(error.message)
    }
}