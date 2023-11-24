import mongoose from "mongoose";


const connecttoDb = () => {
    mongoose.connect("mongodb://localhost:27017").then(() => {
        console.log("db Connected")
    }).catch((e) => {
        console.log("dB ERROR", e)
    })
}

export default connecttoDb