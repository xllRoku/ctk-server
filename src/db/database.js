import mongoose, { mongo } from "mongoose";

const connectDB = async () => {
  try {
    const db = await mongoose.connect(
      "mongodb+srv://admin:admin@cluster0.mrggc.mongodb.net/controlTaken?retryWrites=true&w=majority"
    );

    console.log("Database is conencted to", db.connection.name);
  } catch (error) {
    console.error(error.message);
  }
};

export { connectDB };
