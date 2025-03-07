import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable in .env");
}

// Define global caching for database connection
interface MongooseCache {
  conn: mongoose.Connection | null;
  promise: Promise<mongoose.Connection> | null;
}

// Use "const" instead of "let" because it is not reassigned
const globalWithMongoose = global as typeof globalThis & { mongooseCache?: MongooseCache };

if (!globalWithMongoose.mongooseCache) {
  globalWithMongoose.mongooseCache = { conn: null, promise: null };
}

const cached = globalWithMongoose.mongooseCache;

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, { dbName: "portfolio_database" })
      .then((mongoose) => mongoose.connection);
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
