import mongoose from "mongoose"

export const connectMongoDB = async (req, res) => {
    try {
        await mongoose.connect(process.env.DATABASE_URL)
        console.log('connected to mongodb')
    } catch (e) {
        console.log(e)
    }
}