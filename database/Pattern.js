const mongoose = require('mongoose')
    , Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/patterns', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.Promise = global.Promise;

const patternSchema = new mongoose.Schema({
  name: String,
  synthSeq: Schema.Types.Mixed,
  drumSeq: Schema.Types.Mixed,
  synthParams: Schema.Types.Mixed,
});

const Pattern = mongoose.model('Pattern', patternSchema);

module.exports = Pattern;