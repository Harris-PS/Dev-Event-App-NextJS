import mongoose from 'mongoose';

/**
 * Global type declaration for MongoDB connection caching
 * This prevents TypeScript errors when accessing global cache
 */
declare global {
  // eslint-disable-next-line no-var
  var mongoose: {
    conn: mongoose.Connection | null;
    promise: Promise<mongoose.Connection> | null;
  };
}

/**
 * MongoDB connection URI from environment variables
 * Make sure to add MONGODB_URI to your .env.local file
 */
const MONGODB_URI = process.env.MONGODB_URI;

/**
 * Validate that MONGODB_URI is defined
 */
if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

/**
 * Global cache for MongoDB connection
 * In development, Next.js can create multiple connections due to hot reloading
 * This cache prevents creating new connections on every module reload
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

/**
 * Connect to MongoDB database with connection caching
 * 
 * This function establishes a connection to MongoDB using Mongoose.
 * It implements connection caching to prevent multiple connections during development.
 * 
 * @returns {Promise<mongoose.Connection>} The Mongoose connection instance
 */
async function connectDB(): Promise<mongoose.Connection> {
  /**
   * If a connection already exists, return it immediately
   * This prevents creating unnecessary connections
   */
  if (cached.conn) {
    return cached.conn;
  }

  /**
   * If no connection promise exists, create a new one
   * This ensures only one connection attempt happens at a time
   */
  if (!cached.promise) {
    const opts: mongoose.ConnectOptions = {
      bufferCommands: false, // Disable mongoose buffering to fail fast in serverless
    };

    cached.promise = mongoose.connect(MONGODB_URI!, opts).then((mongoose) => {
      return mongoose.connection;
    });
  }

  try {
    /**
     * Wait for the connection promise to resolve
     * Store the connection in cache for future use
     */
    cached.conn = await cached.promise;
  } catch (error) {
    /**
     * If connection fails, reset the promise so a new attempt can be made
     */
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}

export default connectDB;
