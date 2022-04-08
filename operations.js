//this file is a NODE MODULE containing our DATABASE METHODS
//CREATE-insert...READ-find... UPDATE... DELETE-remove

//assert() No longer used to test for errors with ES6 PROMISE-based approach
// const assert = require("assert").strict;

//BELOW Code uses ES6 PROMISES. By removing the callback arguments of our operations, NODE AUTOMATICALLY RETURNS A PROMISE(BUILT-IN FUNCTIONALITY OF NODE DRIVER API). Result in greatly simplified code.

exports.insertDocument = (db, document, collection) => {
  const coll = db.collection(collection);
  return coll.insertOne(document);
};

exports.findDocument = (db, collection) => {
  const coll = db.collection(collection);
  return coll.find().toArray();
};
exports.removeDocument = (db, document, collection) => {
  const coll = db.collection(collection);
  return coll.deleteOne(document);
};

exports.updateDocument = (db, document, update, collection) => {
  const coll = db.collection(collection);
  return coll.updateOne(document, { $set: update }, null);
};

//****BELOW Code uses CALLBACKS. Updated ^^^above^^^^ to use ES6 PROMISES */

//set up our insertDocument() METHOD and EXPORT it
// exports.insertDocument = (db, document, collection, callback) => {
//   const coll = db.collection(collection);

//   coll.insertOne(document, (err, result) => {
//     assert.strictEqual(err, null);
//     callback(result);
//   });
// };

// //set up our findDocuments() METHOD and EXPORT it
// exports.findDocuments = (db, collection, callback) => {
//   const coll = db.collection(collection);

//   coll.find().toArray((err, docs) => {
//     assert.strictEqual(err, null);
//     callback(docs);
//   });
// };

// //set up our removeDocument() METHOD and EXPORT it
// exports.removeDocument = (db, document, collection, callback) => {
//   const coll = db.collection(collection);

//   coll.deleteOne(document, (err, result) => {
//     assert.strictEqual(err, null);
//     callback(result);
//   });
// };

//set up our updateDocument() METHOD and EXPORT it
//updateDocument() has 4 parameters: document, information about UPDATE(UPDATE OPERATOR $set from MONGODB overwrite information), configs(not used here), CALLBACK FUNCTION
// exports.updateDocument = (db, document, update, collection, callback) => {
//   const coll = db.collection(collection);

//   coll.updateOne(document, { $set: update }, null, (err, result) => {
//     assert.strictEqual(err, null);
//     callback(result);
//   });
// };
