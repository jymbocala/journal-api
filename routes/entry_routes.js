import { Router } from "express";
import { EntryModel } from "../db.js";

const router = Router();

// get all entries from database and send them back as response 
router.get('/', async (req, res) => res.send(await EntryModel.find().populate('category')));

router.get("/:id", async (req, res) => {
  // find entry with id from request parameters
  const entry = await EntryModel.findById(req.params.id).populate('category');

  // if entry exists, send it back. Otherwise, send 404 error with message
  if (entry) {
    res.send(entry);
  } else {
    res.status(404).send({ error: "Entry doesn't exist" });
  }
});

router.post("/", async (req, res) => {
  try {
    //create an instance of the model and save it to the database
    const insertedEntry = await (await EntryModel.create(req.body)).populate('category');
    // respond with 201 and the entry
    res.status(201).send(insertedEntry);
  }
  catch (err) {
    // if validation fails, send 400 error with message
    res.status(500).send({ error: err.message });
  }
});

router.put(":id", async (req, res) => {
  try {
    const updatedEntry = await EntryModel.findByIdAndUpdate(req.params.id, req.body, { new: true});
    
    if (updatedEntry) {
      res.send(updatedEntry);
    } else {
      res.status(404).send({ error: "Entry not found" });
    }
  }
  catch (err) {
    res.status(500).send({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
      const deletedEntry = await EntryModel.findByIdAndDelete(req.params.id)
      if (deletedEntry) {
          res.sendStatus(204)
      } else {
          res.status(404).send({ error: 'Entry not found' })
      }
  }
  catch (err) {
      res.status(500).send({ error: err.message })
  }
});

export default router;