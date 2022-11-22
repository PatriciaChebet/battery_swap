const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// One battery can be assigned a rider at a time
// one to one relationship between a rider and a battery
const riderSchema = new Schema({
    name: String
},
{timestamps: true});

riderSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

riderSchema.set('toJSON', {
    virtuals: true
});

riderSchema.findById = function (cb) {
    return this.model('Rider').find({id: this.id}, cb);
};

const Rider = mongoose.model('Rider', riderSchema);


exports.findById = (id) => {
    return Rider.findById(id)
        .then((result) => {
            result = result.toJSON();
            delete result._id;
            delete result.__v;
            return result;
        });
};

exports.createRider = async (riderData) => {
    const rider = new Rider(riderData);
    return rider.save();
};



