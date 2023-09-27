import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

let mongoServer: MongoMemoryServer;

const connect = async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
};

const clearData = async () => {
  await mongoose.connection.dropDatabase();
};

const disconnect = async () => {
  await mongoose.connection.close();
  await mongoServer?.stop();
};

export const testDBHandler = {
  connect,
  clearData,
  disconnect,
};
