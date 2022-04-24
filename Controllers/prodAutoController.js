const model = require("./../Models/prodAutoModel");
const factory = require("./factoryHandler");

exports.getAllDocuments = factory.getAll(model);

exports.getDocument = factory.getOne(model);

exports.createDocument = factory.createOne(model, {
  user: true,
  hasPhotos: true,
});

exports.updateDocument = factory.updateOne(model, "name", "desc", "slug");

exports.deleteDocument = factory.deleteOne(model);
