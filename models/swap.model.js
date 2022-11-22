const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//A swap highlights the details about battery, rider, 
// current energy reading and the millage at the time of swap
//With this data we should be able to calculate the energy consumed and kilometers covered by a rider
const swapSchema = new Schema({
    currentEnergyReading: { type: Number, required: true },
    currentMileage: { type: Number, required: true },
    battery_id: { type: String, required: true },
    rider_id: { type: String, required: true }
},
{timestamps: true});

swapSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

swapSchema.set('toJSON', {
    virtuals: true
});

swapSchema.findById = function (cb) {
    return this.model('Swap').find({id: this.id}, cb);
};

const Swap = mongoose.model('Swap', swapSchema);

exports.findById = (id) => {
    return Swap.findById(id)
        .then((result) => {
            result = result.toJSON();
            delete result._id;
            delete result.__v;
            return result;
        });
};

exports.createSwap = async (swapData) => {
    const swap = new Swap(swapData);
    return swap.save();
};

exports.list = (perPage, page) => {
    return new Promise((resolve, reject) => {
        Swap.find()
            .limit(perPage)
            .skip(perPage * page)
            .exec(function (err, users) {
                if (err) {
                    reject(err);
                } else {
                    resolve(users);
                }
            })
    });
};



