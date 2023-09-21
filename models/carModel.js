const mongoose = require('mongoose')

const carSchema = mongoose.Schema(
    {
        registration_no: {
            type: String,
            required: true,
        },

        uuid: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true
    }
)


const Car = mongoose.model('Car', carSchema);

module.exports = Car;