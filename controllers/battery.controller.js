const BatteryModel = require('../models/battery.model');

exports.insert = (req, res) => {
    BatteryModel.createBattery(req.body)
        .then((result) => {
            res.status(201).json({success:true, message: "Battery successfully saved!", data: result});
        });
};
