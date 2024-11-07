// import express from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import mongoose from 'mongoose';
// import authRoutes from './routes/auth.js';
// import destinationRoutes from './routes/destinations.js';
// import bookingRoutes from './routes/bookings.js';
// import statesRoutes from './router/routes.js';

// dotenv.config();

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Connect to MongoDB
// const connectToDatabase = async () => {
//   try {
//     await mongoose.connect(process.env.MONGODB_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log('Connected to MongoDB Atlas');
//   } catch (err) {
//     console.error('MongoDB connection error:', err);
//     process.exit(1); // Exit the process with failure
//   }
// };

// // Call the function to connect to the database
// connectToDatabase();

// // Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/destinations', destinationRoutes);
// app.use('/api/bookings', bookingRoutes);

// // Health Check Route
// app.get('/api', (req, res) => {
//   res.send('API is running...');
// });

// // Global Error Handling Middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ message: 'Internal Server Error' });
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });


// import express from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import mongoose from 'mongoose';



// // Import routes
// import authRoutes from './routes/auth.js';
// import destinationRoutes from './routes/destinations.js';
// import bookingRoutes from './routes/bookings.js';
// import statesRoutes from './routes/states.js';


// const bookingsRoutes = require('./routes/bookings');
// const authMiddleware = require('./middleware/auth');

// // import destinationsRouter from './routes/destinations.js'; // Adjust this path if needed


// dotenv.config();

// // Validate environment variables
// if (!process.env.MONGODB_URI) {
//   console.error('MONGODB_URI is not defined in environment variables');
//   process.exit(1);
// }

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());


// // Connect to MongoDB
// const connectToDatabase = async () => {
//   try {
//     await mongoose.connect(process.env.MONGODB_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log('Connected to MongoDB Atlas');
//   } catch (err) {
//     console.error('MongoDB connection error:', err);
//     process.exit(1); // Exit the process with failure
//   }
// };

// // Retry MongoDB connection on failure
// mongoose.connection.on('disconnected', () => {
//   console.log('MongoDB disconnected. Retrying connection...');
//   connectToDatabase();
// });

// // Call the function to connect to the database
// connectToDatabase();

// // Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/destinations', destinationRoutes);
// app.use('/api/states', statesRoutes);
// // app.use('/api/destinations', destinationsRouter);
// app.use('/api/bookings', bookingRoutes);

// app.use('/api/bookings', authMiddleware, bookingsRoutes);

// // Health Check Route
// app.get('/api', (req, res) => {
//   res.send('API is running...');
// });

// // Global Error Handling Middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
// });




// // Start Server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });


// Import necessary modules
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.js';
import destinationRoutes from './routes/destinations.js';
import bookingRoutes from './routes/bookings.js';
import statesRoutes from './routes/states.js';
import auth from './middleware/auth.js'; 

dotenv.config();

if (!process.env.MONGODB_URI) {
  console.error('MONGODB_URI is not defined in environment variables');
  process.exit(1);
}

const app = express();

app.use(cors());
app.use(express.json());

const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB Atlas');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected. Retrying connection...');
  connectToDatabase();
});

connectToDatabase();

app.use('/api/auth', authRoutes);
app.use('/api/destinations', destinationRoutes);
app.use('/api/states', statesRoutes);
app.use('/api/bookings', auth, bookingRoutes);

app.get('/api', (req, res) => {
  res.send('API is running...');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
