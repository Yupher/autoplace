const mongoose = require("mongoose");

const prodAutoSchema = new mongoose.Schema({
  year: {
    type: String,
    required: [true, "Vehicle year is required"],
    trim: true,
  },
  brand: {
    type: String,
    required: [true, "Vehicle brand is required"],
    trim: true,
  },
  model: {
    type: String,
    required: [true, "Vehicle model is required"],
    trim: true,
  },
  color: {
    type: String,
    required: [true, "Vehicle color is required"],
    trim: true,
  },
  energy: {
    type: String,
    required: [true, "Vehicle energy is required"],
    trim: true,
  },
  options: {
    type: Array,
  },
  paper: {
    type: String,
    required: [true, "Vehicle paper is required"],
    trim: true,
  },
  transmission: {
    type: String,
    required: [true, "Vehicle transmission is required"],
    trim: true,
  },
  slug: String,
  description: {
    type: String,
    required: [true, "Vehicle description is required"],
    trim: true,
  },
  kilometrage: {
    type: String,
    required: [true, "Vehicle kilometrage is required"],
    trim: true,
  },
  images: {
    type: Array,
    required: [true, "Vehicle photos is required"],
  },
  price: {
    type: String,
    required: [true, "Vehicle price is required"],
    trim: true,
  },
  offerType: {
    type: String,
    required: [true, "Vehicle offer type is required"],
    trim: true,
  },
  exchange: {
    type: Boolean,
    default: false,
  },
  wilaya: {
    type: String,
    required: [true, "User wilaya is required"],
    trim: true,
  },
  commune: {
    type: String,
    required: [true, "User commune is required"],
    trim: true,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
    required: [true, "User phone is required"],
    trim: true,
  },
  displayPhone: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  addedBy: {
    type: mongoose.Schema.ObjectId,
    ref: "users",
    required: [true, "A user is needed to add a section."],
  },
  accepted: {
    value: {
      type: Boolean,
      default: undefined,
    },
    acceptedBy: {
      type: mongoose.Schema.ObjectId,
      ref: "users",
      required: [true, "A user is needed to for this action."],
    },
    acceptedAt: {
      type: Date,
    },
  },
});

prodAutoSchema.pre(/^find/, function (next) {
  this.populate("addedBy");
  this.populate("accepted.acceptedBy");
  next();
});

const Section = mongoose.model("prodauto", prodAutoSchema);

module.exports = Section;
