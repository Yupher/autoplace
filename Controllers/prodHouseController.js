const model = require("./../Models/prodHouseModel");
const factory = require("./factoryHandler");






exports.getAllDocuments = factory.getAll(model);

exports.createDocument = factory.createOne(model, { user: true });

exports.updateDocument = factory.updateOne(model, "name", "desc", "slug");

exports.deleteDocument = factory.deleteOne(model);