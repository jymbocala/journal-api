import mongoose from "mongoose";
import dotenv from "dotenv";

// load environment variables
dotenv.config();

try {
  const m = await mongoose.connect(process.env.MONGODB_URI);
  console.log(
    m.connection.readyState === 1
      ? "MongoDB connected"
      : "MongoDB failed to connect"
  );
} catch (err) {
  console.log(err);
}

// close connection 
process.on("SIGINT", async () =>  {
  
  mongoose.disconnect()
});

// close connection function
const closeConnection = () => {
  console.log('Mongoose disconnecting...')
  mongoose.disconnect()
};

//create category schema
const categoriesSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

// create category model
const CategoryModel = mongoose.model("Category", categoriesSchema);

// create schema
const entriesSchema = new mongoose.Schema({
  category: { type: mongoose.ObjectId, ref: 'Category' },
  content: { type: String, required: true },
});

// create model
const EntryModel = mongoose.model("Entry", entriesSchema);


export { closeConnection, EntryModel, CategoryModel };
