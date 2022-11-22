const BatteryModel = require('../models/battery.model');
const RiderModel = require('../models/rider.model');

exports.updatesBattery = async(req, res, next) => {

    const batteryToSwap = await BatteryModel.findById(req.body.battery_id);
    const riderAssigned = await RiderModel.findById(req.body.rider_id);

    if (!batteryToSwap) {
        throw new NotFoundError();
      }

    if (!riderAssigned) {
        throw new NotFoundError();
      }

    BatteryModel.patchBattery(req.body.battery_id, riderAssigned.id)
      .then((result) => {
          return next()
      });
}