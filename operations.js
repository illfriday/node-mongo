//this file is a NODE MODULE containing our DATABASE METHODS
//CREATE-insert...READ-find... UPDATE... DELETE-remove
const assert = require("assert").strict;

//set up our insertDocument() METHOD and EXPORT it
exports.insertDocument = (db, document, collection, callback) => {
  const coll = db.collection(collection);

  coll.insertOne(document, (err, result) => {
    assert.strictEqual(err, null);
    callback(result);
  });
};

//set up our findDocuments() METHOD and EXPORT it
exports.findDocuments = (db, collection, callback) => {
  const coll = db.collection(collection);

  coll.find().toArray((err, docs) => {
    assert.strictEqual(err, null);
    callback(docs);
  });
};

//set up our removeDocument() METHOD and EXPORT it
exports.removeDocument = (db, document, collection, callback) => {
  const coll = db.collection(collection);

  coll.deleteOne(document, (err, result) => {
    assert.strictEqual(err, null);
    callback(result);
  });
};

//set up our updateDocument() METHOD and EXPORT it
//updateDocument() has 4 parameters: document, information about UPDATE(UPDATE OPERATOR $set from MONGODB overwrite information)m configs9not used here, CALLBACK FUNCTION
exports.updateDocument = (db, document, update, collection, callback) => {
  const coll = db.collection(collection);

  coll.updateOne(document, { $set: update }, null, (err, result) => {
    assert.strictEqual(err, null);
    callback(result);
  });
};
