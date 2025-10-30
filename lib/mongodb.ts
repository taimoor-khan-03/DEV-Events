import mongoose from "mongoose";

// Define the MongoDB connection URI from environment variables
const MONGODB_URI = process.env.MONGO_DB_URI;

if (!MONGODB_URI) {
    throw new Error(
        "Please define the MONGODB_URI environment variable inside .env.local"
    );
}

// Define types for the global mongoose cache
interface MongooseCache {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
}

// Extend the global object to include our mongoose cache
declare global {
    var mongoose: MongooseCache | undefined;
}

// Initialize the cache object
const cached: MongooseCache = global.mongoose || { conn: null, promise: null };

// Assign to global to persist across hot reloads in development
if (!global.mongoose) {
    global.mongoose = cached;
}

/**
 * Establishes a connection to MongoDB using Mongoose
 * Caches the connection to prevent multiple connections in development mode
 * @returns Promise resolving to the Mongoose instance
 */
async function connectDB(): Promise<typeof mongoose> {
    // Return existing connection if available
    if (cached.conn) {
        return cached.conn;
    }

    // Return existing promise if connection is in progress
    if (!cached.promise) {
        const opts = {
            bufferCommands: false, // Disable Mongoose buffering
        };

        // Create new connection promise
        cached.promise = mongoose
            .connect(MONGODB_URI!, opts)
            .then((mongoose) => {
                return mongoose;
            });
    }

    try {
        // Wait for connection to complete and cache it
        cached.conn = await cached.promise;
    } catch (e) {
        // Reset promise on error to allow retry
        cached.promise = null;
        throw e;
    }

    return cached.conn;
}

export default connectDB;
