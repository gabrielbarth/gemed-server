import mongoose, { AutoIncrement } from '../connection';

const ExternalCommunicationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  to: {
    type: String,
    required: false
  },
  date: {
    type: Date,
    default: Date.now
  }
});

ExternalCommunicationSchema.plugin(AutoIncrement, { inc_field: 'ec_number', start_seq: 50 }); //start_seq: 500

const ExternalCommunication = mongoose.model('ExternalCommunication', ExternalCommunicationSchema);

export default ExternalCommunication;