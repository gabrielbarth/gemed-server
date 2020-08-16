import mongoose, { AutoIncrement } from '../connection';

const InternalCommunicationSchema = new mongoose.Schema({
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

InternalCommunicationSchema.plugin(AutoIncrement, { inc_field: 'ic_number', start_seq: 700 }); //start_seq: 500

const InternalCommunication = mongoose.model('InternalCommunication', InternalCommunicationSchema);


export default InternalCommunication;