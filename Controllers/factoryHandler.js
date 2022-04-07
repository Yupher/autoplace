const catchAsync = require('./../utils/catchAsync');
const AppError = require('../utils/appError')
const APIFeatures = require('../utils/APIFeatures')
const obgFiltring = require('../utils/obgFiltring')




exports.getAll = Model =>
    catchAsync(async (req, res, next) => {

        const features = new APIFeatures(Model.find(), req.query)
            .filter()
            .sort()
            .limitFields()
            .paginate();

        const doc = await features.query;

        // SEND RESPONSE
        res.status(200).json({
            status: 'success',
            results: doc.length,
            data: doc
        });
    });


exports.createOne = (Model, params) =>
    catchAsync(async (req, res, next) => {

        if (params.user) {
            req.body.addedBy = req.user._id;
        }

        const doc = await Model.create(req.body);

        res.status(201).json({
            status: 'success',
            data: doc
        });
    });


exports.updateOne = (Model, ...filtring) =>
    catchAsync(async (req, res, next) => {
        const doc = await Model.findByIdAndUpdate(req.params.id, obgFiltring(req.body, filtring), {
            new: true,
            runValidators: true
        });


        if (!doc) {
            return next(new AppError('No document found with that ID', 404));
        }

        res.status(200).json({
            status: 'success',
            data: doc
        });
    });


exports.deleteOne = Model =>
    catchAsync(async (req, res, next) => {
        const doc = await Model.findByIdAndDelete(req.params.id);

        if (!doc) {
            return next(new AppError('No document found with that ID', 404));
        }

        res.status(204).json({
            status: 'success',
            data: null
        });
    });