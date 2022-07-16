
const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const cors = require("cors");
const bodyParser = require("body-parser");
const port = 80;
const app = express();
app.use(cors());


app.use(bodyParser.json());

const uri = "mongodb+srv://admindavid:Vashchenko141@cluster0.xrszh.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
});
const collection = client.db("Interview").collection("list");

app.get('/', (req, res) => {
    client.connect((err) => {
      collection.find({}).toArray().then((data) => {
        res.send(data);
      });    
    });
  });
app.patch('/status', (req, res) => {  
    client.connect(async (err) => {
      const data = req.body;
      const updateResult = await collection.updateOne(
        { _id: ObjectId(data._id) },
        { $set: { status: data.status}}
        );
        res.send(updateResult);
      });
  });

  app.patch('/reset', (req, res) => {  
    client.connect(async (err) => {
      const data = req.body;
      const updateResult = await collection.updateMany(
        { status: { $gt : 0 } },
        { $set: { status: data.status}}
        );
        res.send(updateResult);
      });
  });

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});

