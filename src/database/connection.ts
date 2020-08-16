import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/gemedserver', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

export const AutoIncrement = require('mongoose-sequence')(mongoose);

export default mongoose;