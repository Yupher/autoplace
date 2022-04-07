const section = require("./../Models/sectionModel");
const factory = require("./factoryHandler");






exports.getAllSection = factory.getAll(section);

exports.createSection = factory.createOne(section, { user: true });

exports.updateSection = factory.updateOne(section, "name", "desc", "slug");

exports.deleteSection = factory.deleteOne(section);