const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//A battery should be assigned to a station and a rider 
//there is a one to one relationship between a rider and a battery
const batterySchema = new Schema({
    serial_number: String,
    availability: Boolean,
    station: {
        type: Schema.Types.ObjectId,
        ref: 'Station',
        required: true
    },
    rider: {
        type: Schema.Types.ObjectId,
        ref: 'Rider',
        required: true
    }
},
{timestamps: true});

batterySchema.virtual('id').get(function () {
    return this._id.toHexString();
});

batterySchema.set('toJSON', {
    virtuals: true
});

batterySchema.findById = function (cb) {
    return this.model('Battery').find({id: this.id}, cb);
};

const Battery = mongoose.model('Battery', batterySchema);


exports.findById = (id) => {
    return Battery.findById(id)
        .then((result) => {
            result = result.toJSON();
            delete result._id;
            delete result.__v;
            return result;
        });
};

exports.createBattery = async (batteryData) => {
    const battery = new Battery(batteryData);
    return battery.save();
};

exports.patchBattery = (id, riderAssigned) => {
    return Battery.findOneAndUpdate({
        _id: id
    }, {$set: {'rider': riderAssigned}});
};



