import { MongoMemoryServer } from 'mongodb-memory-server';
import * as mongoose from 'mongoose';

let mongoServer: MongoMemoryServer;
const port = 27030;
const dbName = 'test';
const MONGO_URL = `mongodb://127.0.0.1:${port}/test`;

process.env.MONGO_URL = MONGO_URL;

beforeAll(async () => {
  try {
    mongoServer = await MongoMemoryServer.create({
      instance: {
        port,
        dbName,
      },
    });
    const mongoUri = await mongoServer.getUri();

    await mongoose.connect(mongoUri);
  } catch (e) {
    console.log(e, 'error');
  }
});

beforeEach(async () => {
  //delete element in the collection
  try {
    const collections = await mongoose.connection.db?.collections();
    collections &&
      (await Promise.all(
        collections.map((collection) => collection.deleteMany({})),
      ));
  } catch (err) {
    console.error(err, 'err');
  }
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
}, 1000);
