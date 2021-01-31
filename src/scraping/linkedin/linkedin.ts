import { SearchJobsCallback } from '../../types';
import { logIn } from './logIn';
import { searchJobs } from './searchJobs';

export const searchJobsOnLinkedin: SearchJobsCallback = async (
    keyword: string,
    location = '',
) => {
    await logIn();
    return await searchJobs(keyword, location);
};