import mongoose from 'mongoose';

const destinationSchema = new mongoose.Schema({
  destinationId: {
    type: Number,
    required: true,
    unique: true
  },
  state: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  images: [String],
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  hotels: [{
    name: String,
    rating: Number,
    priceRange: String,
    contact: String
  }],
  attractions: [{
    name: String,
    description: String,
    bestTimeToVisit: String
  }]
}, { timestamps: true });

destinationSchema.index({ location: '2dsphere' });

export default mongoose.model('Destination', destinationSchema);