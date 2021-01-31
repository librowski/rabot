import { Collection, MongoClient } from 'mongodb';
import { JobOffer, User } from './types';

const uri = 'mongodb://rabotDB:27017';

const client = new MongoClient(uri, {
    useUnifiedTopology: true,
});

export let jobOffers: Collection<JobOffer>;
export let users: Collection<User>;

export const initDB = async (): Promise<void> => {
    try {
        await client.connect();
        const db = client.db('test');

        jobOffers = db.collection('job_offers');
        users = db.collection('users');
    } finally {
    }
};