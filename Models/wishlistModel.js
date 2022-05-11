const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "users",
  },
  products: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "prodauto",
    },
  ],
});

wishlistSchema.pre(/^find/, function (next) {
  this.populate("user");

  next();
});

const Section = mongoose.model("wishlist", wishlistSchema);

module.exports = Section;
