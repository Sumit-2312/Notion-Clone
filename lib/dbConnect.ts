import mongoose, { Connection } from 'mongoose';

// Explicit return type for clarity: Promise<Connection>
export default async function connect(): Promise<Connection> {
  // Check if already connected
  if (mongoose.connection.readyState >= 1) {
    console.log("Already connected to Database");
    return mongoose.connection;
  }

  try {
    // Connect to MongoDB
    const connection = await mongoose.connect(process.env.MONGO_URI!);
    console.log("Connected to Database");
    return connection.connection; // This is a Mongoose 'Connection' object
  } catch (error) {
    console.error('Could not connect to Database', error);
    throw new Error('Database connection failed');
  }
}
