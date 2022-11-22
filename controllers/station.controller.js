const StationModel = require('../models/station.model');

exports.insert = (req, res) => {
    StationModel.createStation(req.body)
        .then((result) => {
            res.status(201).json({success:true, message: "Station successfully saved!", data: result});
        });
};
