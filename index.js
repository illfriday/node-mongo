// requires MongoDB Node Driver and it's MongoClient MODULE. so ap can act as a CLIENT for MONGO SERVER.
const MongoClient = require("mongodb").MongoClient;
//assert() NODE CORE MODULE No longer used to test for errors with ES6 PROMISE-based approach
//assert() No longer used to test for errors with ES6 PROMISE-based approach

//import our NODE MODULE 'operations'
const dboper = require("./operations");

//set up connection to the MONGO SERVER using custom protocol of MongoDB
const url = "mongodb://localhost:27017/";
//DATABASE NAME
const dbname = "nucampsite";

MongoClient.connect(url, { useUnifiedTopology: true })
  .then((client) => {
    console.log("Connected correctly to the server.");

    const db = client.db(dbname);

    db.dropCollection("campsites")
      .then((result) => {
        console.log("Dropped collection:", result);
      })
      .catch((err) => console.log("No collection to drop."));

    dboper
      .insertDocument(
        db,
        { name: "Breadcrumb Trail Campground", description: "On fire!" },
        "campsites"
      )
      .then((result) => {
        console.log("Insert Document:", result.ops);

        return dboper.findDocument(db, "campsites");
      })
      .then((docs) => {
        console.log("Found Documents:", docs);

        return dboper.updateDocument(
          db,
          { name: "Breadcrumb Trail Campground" },
          { description: "No longer on fire!!" },
          "campsites"
        );
      })
      .then((result) => {
        console.log("Updated Document Count:", result.result.nModified);

        return dboper.findDocument(db, "campsites");
      })
      .then((docs) => {
        console.log("Found Documents:", docs);

        return dboper.removeDocument(
          db,
          { name: "Breadcrumb Trail Campground" },
          "campsites"
        );
      })
      .then((result) => {
        console.log("Deleted Document Count:", result.deletedCount);

        return client.close();
      })
      .catch((err) => {
        console.log(err);
        client.close();
      });
  })
  .catch((err) => console.log(err));

//*****Code below uses NESTED CALLBACKS to work around NODE'S NON_BLOCKING nature. Each NESTED CALLBACK is explicitly told to wait until the previous CALLBACK has returned a value/completed it's task. This results in complex code, which can be simplified using ES6 PROMISES, chained .then().catch() METHODS which act as placeholders for VALUES THAT ARE NOT YET AVAILABLE and handling errors if they never become available. This is called a PROMISE CHAIN. ES6 PROMISES are natively supported/built into NODE. CODE RE-WRITTEN ABOVE^^^^^ */

//Connect MONGO CLIENT to MONGODB server. URL, configuration, CALLBACK FUNCTION with error handling

// MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {

//   //assert() can perform various checks here we are checking the EXPECTED VALUE of err(ERROR) against 'null'. So if the value of 'err' === null, we ASSERT we have connected successfully. if the ASSERTION fails, this causes the ap to terminate and throw an ERROR
//   assert.strictEqual(err, null);

//   console.log("Connected correctly to server.");
//   //this connects to the CLiENT to MongoDB 'nucampsite'

//   const db = client.db(dbname);

//DELETE all docs in the 'campsite collection' bc we have been messing with it/start fresh w/o docs from a previous test
//   db.dropCollection("campsites", (err, result) => {
//     assert.strictEqual(err, null);
//     console.log("Dropped Collection:", result);

//     //     //insert a DOCUMENT into the COLLECTION. We give a JSON STRING and a CALLBACK FUNCTION to test for errors
//     dboper.insertDocument(
//       db,
//       { name: "Breadcrumb Trail Campground", description: "On fire." },
//       "campsites",
//       (result) => {
//         console.log("Insert Document:", result.ops);

//         dboper.findDocuments(db, "campsites", (docs) => {
//           console.log("Found Documents:", docs);

//           dboper.updateDocument(
//             db,
//             { name: "Breadcrumb Trail Campground" },
//             { description: "Not on fire anymore." },
//             "campsites",
//             (result) => {
//               console.log("Updated document count:", result.result.nModified);

//               dboper.findDocuments(db, "campsites", (docs) => {
//                 console.log("Found Documents:", docs);

//                 dboper.removeDocument(
//                   db,
//                   { name: "Breadcrumb Trail Campground" },
//                   "campsites",
//                   (result) => {
//                     console.log("Deleted Document Count:", result.deletedCount);
//                   }
//                 );
//               });
//             }
//           );
//         });
//       }
//     );
//   });
// });
