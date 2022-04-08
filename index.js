// requires MongoDB Node Driver and it's MongoClient MODULE. so ap can act as a CLIENT for MONGO SERVER.
const MongoClient = require("mongodb").MongoClient;
//assert NODE CORE MODULE
const assert = require("assert").strict;
//import our NODE MODULE 'operations'
const dboper = require("./operations");

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

  //WORKS*******
  // if (db.collection("campsites")) {
  //   db.dropCollection("campsites", (err, result) => {
  //     assert.strictEqual(err, null);
  //     console.log("Dropped Collection:", result);

  //     /****** */
  //     //Recreate fresh instance of the 'campsites' COLLECTION
  //     //MOVED TO OPERATIONS
  //     // const collection = db.collection("campsites");

  //   });
  // }
  //DELETE all docs in the 'campsite collection' bc we have been messing with it/start fresh w/o docs from a previous test
  db.dropCollection("campsites", (err, result) => {
    assert.strictEqual(err, null);
    console.log("Dropped Collection:", result);
    //     //insert a DOCUMENT into the COLLECTION. We give a JSON STRING and a CALLBACK FUNCTION to test for errors
    dboper.insertDocument(
      db,
      { name: "Breadcrumb Trail Campground", description: "On fire." },
      "campsites",
      (result) => {
        console.log("Insert Document:", result.ops);

        dboper.findDocuments(db, "campsites", (docs) => {
          console.log("Found Documents:", docs);

          dboper.updateDocument(
            db,
            { name: "Breadcrumb Trail Campground" },
            { description: "Not on fire anymore." },
            "campsites",
            (result) => {
              console.log("Updated document count:", result.result.nModified);

              dboper.findDocuments(db, "campsites", (docs) => {
                console.log("Found Documents:", docs);

                dboper.removeDocument(
                  db,
                  { name: "Breadcrumb Trail Campground" },
                  "campsites",
                  (result) => {
                    console.log("Deleted Document Count:", result.deletedCount);
                  }
                );
              });
            }
          );
        });
      }
    );
  });
});
