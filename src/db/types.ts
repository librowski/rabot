import { User as TelegramUser } from 'telegraf/typings/telegram-types';

export type JobLocation = {
    city: string;
    country?: string;
    coordinates?: [number, number];
}

export type JobOffer = {
    link: string;
    title: string;
    company: string;
    location: JobLocation;
    portalName?: string;
    postedAt?: Date;
    validUntil?: Date;
    viewsCount?: number;
    applicantsCount?: number;
}

export type JobFeed = {
    keyword: string;
    location: JobLocation;
    lastUpdated: Date;
}

export type User = 
    & TelegramUser
    & {
        jobFeeds: JobFeed[];
    };