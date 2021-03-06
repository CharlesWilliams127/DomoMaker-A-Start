const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const _ = require('underscore');

let DomoModel = {};

const convertID = mongoose.Types.ObjectId;
const setName = (name) => _.escape(name).trim();

const DomoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    set: setName,
  },
  age: {
    type: Number,
    min: 0,
    required: true,
  },
  height: {
    type: Number,
    min: 0,
    required: true,
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

DomoSchema.statics.toAPI = (doc) => ({
  // _id is built into your mongo document and is guaranteed to be unique
  name: doc.name,
  age: doc.age,
  height: doc.height,
});

DomoSchema.statics.findByOwner = (ownerId, callback) => {
  const search = {
    owner: convertID(ownerId),
  };

  return DomoModel.find(search).select('name age height').exec(callback);
};

DomoSchema.statics.findByName = (ownerId, nameSearch, callback) => {
  const search = {
    owner: convertID(ownerId),
    name: nameSearch,
  };

  return DomoModel.find(search).select('name age height').exec(callback);
};

// DomoSchema.statics.updateByName = (ownerId, nameSearch, updateVals, callback) => {
//   const search = {
//     owner: convertID(ownerId),
//     name: nameSearch,
//   };

//   return DomoModel.update(search, updateVals, {upsert: false}).exec(callback);
// };

DomoModel = mongoose.model('Domo', DomoSchema);

module.exports.DomoModel = DomoModel;
module.exports.DomoSchema = DomoSchema;
