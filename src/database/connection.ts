import mongoose from 'mongoose';

mongoose.connect('mongodb+srv://gemed:gemed2020@gemed.1jdtz.mongodb.net/gemed-database?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

export const AutoIncrement = require('mongoose-sequence')(mongoose);

export default mongoose;