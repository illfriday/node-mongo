// requires MongoDB Node Driver and it's MongoClient MODULE. so ap can act as a CLIENT for MONGO SERVER.
const MongoClient = require("mongodb").MongoClient;
//assert NODE CORE MODULE
const assert = require("assert").strict;

//set up connection to the MONGO SERVER using custom protocol of MongoDB
const url = "mongodb://localhost:27017/";
//DATABASE NAME
const dbname = "nucampsite";

//Connect MONGO CLIENT to MONGODB server. URL, configuration, CALLBACK FUNCTION with error handling
MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
  //assert() can perform various checks here we are checking the EXPECTED VALUE of err(ERROR) against 'null'. So if the value of 'err' === null, we ASSERT we have connected successfully. if the ASSERTION fails, this causes the ap to terminate and throw an ERROR
  assert.strictEqual(err, null);

  console.log("Connected correctly to server.");
  //this connects to the CLiENT to MongoDB 'nucampsite'
  const db = client.db(dbname);

  //DELETE all docs in the 'campsite collection' bc we have been messing with it/start fresh w/o docs from a previous test
  db.dropCollection("campsites", (err, result) => {
    assert.strictEqual(err, null);
    console.log(`Dropped collection ${result}.`);
    //Recreate fresh instance of the 'campsites' COLLECTION
    const collection = db.collection("campsites");
    //insert a DOCUMENT into the COLLECTION. We give a JSON STRING and a CALLBACK FUNCTION to test for errors
    collection.insertOne(
      { name: "Breadcrumb Trail Campground", description: "On fire." },
      (err, result) => {
        assert.strictEqual(err, null);
        //.ops(OPERATIONS PROPERTY) for insertOne() METHOD will contain an ARRAY with the DOCUMENT that we inserted
        console.log(`Insert Document:`, result.ops);
        //find() METHOD with no PARAMETERS= FIND ALL DOCUMENTS
        //.toArray() METHOD from MONGODB NODE DRIVER. Convert the DOCUMENTS to an ARRAY so we can print them all
        collection.find().toArray((err, docs) => {
          assert.strictEqual(err, null);
          console.log(`Found Documents:`, { docs });
          //terminate the CLIENT/ exit the ap
          client.close();
        });
      }
    );
  });
});
