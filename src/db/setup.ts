import { MongoClient } from 'mongodb';

const uri = 'mongodb://rabotDB:27017';

const client = new MongoClient(uri);

export const setup = async (): Promise<void> => {
    try {
        await client.connect();
        await client.db('admin').command({ ping: 1 });
    } finally {
        await client.close();
    }
};