const mongoose = require('mongoose');

const RecordSchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  categoryRef: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  debitDate: {
    type: Date,
    required: true
  },
  userRef: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  isDelete: {
    type: Boolean,
    default: false
  }
},
{
    timestamps: true,
    toObject: {
        virtuals: true,
    },
    toJSON: {
        virtuals: true,
    }
}

);

const Record = mongoose.model('Record', RecordSchema);

module.exports = Record;
