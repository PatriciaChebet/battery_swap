const StationsController = require('../controllers/station.controller');
const BatteryController = require('../controllers/battery.controller');
const RiderController = require('../controllers/rider.controller');
const SwapController = require('../controllers/swap.controller');
const UpdatesMiddleware = require('../middlewares/battery.updates.middleware')

exports.swapConfig = function(app){
    
    //inserts a station to the database
    app.post("/api/station/create", [
        StationsController.insert
    ]);

    //inserts a battery to the database
    app.post("/api/battery/create", [
        BatteryController.insert
    ]);

    //inserts a rider to the database
    app.post("/api/rider/create", [
        RiderController.insert
    ]);

    //inserts a swap to the database
    app.post("/api/swaps/create", [
        //middleware to find the battery being swapped and updates it with a rider
        UpdatesMiddleware.updatesBattery,
        SwapController.insert // creates the swap with the provided parameters
    ]);

    //returns all the swaps in the database
    app.get("/api/swaps", [
        SwapController.list
    ]);
}