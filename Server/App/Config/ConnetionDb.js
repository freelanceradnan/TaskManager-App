import mongoose from 'mongoose';

const uri = process.env.MONGODB_STR; 

if (!uri) {
  throw new Error('MONGODB_URI is not defined in Environment Variables');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(uri, {
      autoIndex: true,
    }).then((mongooseInstance) => {
      console.log('MongoDB connection success!');
      return mongooseInstance;
    }).catch((err) => {
      console.error('MongoDB connection error details:', err);
      throw err;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}