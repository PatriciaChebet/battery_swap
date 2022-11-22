const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//A station can have many batteries hence 
//a one to many relationship between a station and abattery 
const stationSchema = new Schema({
    station: String,
    mappedBatteries: [{
        type: Schema.Types.ObjectId,
        ref: 'Battery'
    }] 
},
{timestamps: true});

stationSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

stationSchema.set('toJSON', {
    virtuals: true
});

stationSchema.findById = function (cb) {
    return this.model('Station').find({id: this.id}, cb);
};

const Station = mongoose.model('Station', stationSchema);

exports.findById = (id) => {
    return Station.findById(id)
        .then((result) => {
            result = result.toJSON();
            delete result._id;
            delete result.__v;
            return result;
        });
};

exports.createStation = (stationData) => {
    const station = new Station(stationData);
    return station.save();
};


