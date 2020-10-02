var mongoose = require('mongoose');
var Schema = mongoose.Schema;

scheduleSchema = new Schema( {
    name: String,
    date: Date,
    approveStatus: String,
})

module.exports = mongoose.model('schedules', scheduleSchema);