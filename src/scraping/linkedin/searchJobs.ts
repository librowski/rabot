import { page } from '../browser';
import { LINKEDIN_JOBS_URL } from './constants';

const selectors = {
    CONTAINER: '.job-card-container',
    LINK: '.job-card-list__title',
    COMPANY: '.job-card-container__company-name',
    METADATA: '.job-card-container__metadata-item',
};

type JobData = {
    title: string;
    link: string;
    company: string;
    metadataItems: string;
}

export const searchJobs = async (keyword: string): Promise<JobData[]> => {
    await page.goto(
        `${LINKEDIN_JOBS_URL}/search/?keywords=${encodeURIComponent(keyword)}`
    );
    await page.waitForSelector(selectors.CONTAINER);

    return await page.$$eval(
        selectors.CONTAINER,
        (
            elements: HTMLAnchorElement[],
            sel: typeof selectors
        ) => elements.map((el: HTMLAnchorElement) => {
            const link = el.querySelector(sel.LINK) as HTMLAnchorElement;
            const company = el.querySelector(sel.COMPANY) as HTMLDivElement;
            const metadataItems
                = Array.from(el.querySelectorAll(sel.METADATA)) ?? [];

            return ({
                title: link.innerText,
                link: /.*?(?=\/\?refId)/.exec(link.href)[0],
                company: company?.innerText ?? '',
                metadataItems: metadataItems.map(
                    (meta) => meta?.innerHTML ?? ''
                ).join('\n'),
            });
        }),
        selectors,
    );
};