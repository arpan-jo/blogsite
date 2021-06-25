const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
// const ObjectID = require('mongodb').ObjectID;
require('dotenv').config();
const app = express();
// const port = process.env.PORT || 3505;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qrbqu.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect((err) => {
  console.log(err);
  const blogCollection = client.db('blogsite').collection('blogs');

  app.get('/allPosts', (req, res) => {
    blogCollection.find({}).toArray((err, documents) => {
      res.send(documents);
    });
  });

  app.post('/addPost', (req, res) => {
    const blog = req.body;
    console.log(blog);
    blogCollection
      .insertOne(blog)
      .then((result) => res.send(result.insertedCount > 0));
  });
});

app.get('/', (req, res) => {
  res.send('Helllo, Blog Server!');
});

// app.listen(port);

app.listen(3505);
