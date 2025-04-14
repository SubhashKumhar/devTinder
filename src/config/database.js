import mongoose from "mongoose";

const connectDB = async () => {
    await mongoose.connect("mongodb+srv://subhashk:M5j3rnHli2KcHSGw@namastenode.nnmbsu8.mongodb.net/devTinder")
}

export default connectDB;