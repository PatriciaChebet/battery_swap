const RiderModel = require('../models/rider.model');

exports.insert = (req, res) => {
    RiderModel.createRider(req.body)
        .then((result) => {
            res.status(201).json({success:true, message: "Rider successfully saved!", data: result});
        });
};
