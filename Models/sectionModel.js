const mongoose = require('mongoose');


const sectionSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'A tour must have a name'],
            // unique: true,
            trim: true,
        },
        slug: String,
        desc: {
            type: String,
            trim: true
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            select: false
        },
        updatedAt: {
            type: Date,
            default: Date.now(),
            select: false
        },
        addedBy: {
            type: mongoose.Schema.ObjectId,
            ref: 'users',
            required: [true, 'A user is needed to add a section.']
        }
    }
);

sectionSchema.pre(/^find/, function (next) {
    this.populate("addedBy");
    next();
});


const Section = mongoose.model('section', sectionSchema);

module.exports = Section;