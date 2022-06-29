import mongoose from "mongoose";
import { MongoMemoryServer } from 'mongodb-memory-server';

export = async function globalTeardown() {
  const instance: MongoMemoryServer = (global as any).__MONGOINSTANCE;

  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await instance.stop();
};