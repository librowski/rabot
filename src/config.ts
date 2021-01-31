import { searchJobsOnLinkedin } from './scraping/linkedin/linkedin';
import { RabotConfig } from './types';

export const config: RabotConfig = {
    searchJobsCallbacks: {
        'LinkedIn': searchJobsOnLinkedin,
    }
};