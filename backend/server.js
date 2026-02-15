const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');

const app = express();

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'passwordManagerDB';

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

async function connectDB() {
  await client.connect();
  console.log("MongoDB Connected Successfully ");
}

connectDB();


app.get('/', async (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection('passwords');

  const passwords = await collection.find({}).toArray();
  res.json(passwords);
});


app.post('/', async (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection('passwords');

  const result = await collection.insertOne(req.body);

  res.json({
    success: true,
    id: result.insertedId
  });
});

app.delete('/:id', async (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection('passwords');

  const result = await collection.deleteOne({
    _id: new ObjectId(req.params.id)
  });

  res.json({
    success: true
  });
});

app.put('/:id', async (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection('passwords');

  const result = await collection.updateOne(
    { _id: new ObjectId(req.params.id) },
    { $set: req.body }
  );

  res.json({
    success: true
  });
});

const port = 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port} 🚀`);
});

// npm init - y
// npm install express@latest
// node --watch server.js
// npm i dotenv
// npm install mongodb
// npm i body-parser
// npm i cores to allow cross origin requests