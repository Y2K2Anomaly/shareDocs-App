import mongoose from "mongoose";

const DBConnection = async () => {
    try {
        await mongoose.connect(
            process.env.MONGO_URL,
            { useNewUrlParser: true }
        )
        console.log("Database connected successfully...")
    } catch (error) {
        console.error("Error while connecting with the database", error.message)
    }
}

export default DBConnection;