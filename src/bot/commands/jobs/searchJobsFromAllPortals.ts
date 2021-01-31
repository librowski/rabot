import * as _ from 'lodash/fp';
import { config } from '../../../config';
import { JobOffer } from '../../../db/types';
import { SearchJobsCallback } from '../../../types';
import { parseJobs } from '../../../utils';

export const searchJobsFromAllPortals: SearchJobsCallback = async (
    keyword,
    location,
) => {
    const searchJobsCallbacks = _.entries(config.searchJobsCallbacks);

    const jobs: JobOffer[] = [];

    for (const [portalName, getJobsFn] of searchJobsCallbacks) {
        const newJobs = (await getJobsFn(keyword, location)).map(
            (job) => ({
                ...job,
                portalName,
            })
        );

        jobs.push(...newJobs);
    }

    return parseJobs(jobs) as JobOffer[];
};