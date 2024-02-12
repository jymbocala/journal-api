import { CategoryModel, EntryModel, closeConnection } from "./db.js";

const categories = [
  {
      "name": "Food"
  },
  {
      "name": "Gaming"
  },
  {
      "name": "Coding"
  },
  {
      "name": "Other"
  }
]

await CategoryModel.deleteMany();
console.log("Deleted Categories");
const cats = await CategoryModel.insertMany(categories);
console.log("Added categories");

const entries = [
  { category: cats[0]._id, content: 'Pizza is yummy!' },
  { category: cats[2]._id, content: 'Coding is fun!' },
  { category: cats[1]._id, content: 'Skyrim is for the Nords' }
]

// delete all instances of EntryModel from database
await EntryModel.deleteMany();
console.log("Deleted entries");
await EntryModel.insertMany(entries);
console.log("Added entries");

closeConnection();