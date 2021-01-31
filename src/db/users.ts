import { User } from 'telegraf/typings/telegram-types';
import { users } from './db';

export const isUserSaved = async (id: number): Promise<boolean> => {
    const user = await users.findOne({ id });

    return !!user;
};

export const saveUser = (user: User): void => {
    users.insertOne({
        ...user,
        jobFeeds: [],
    });
};