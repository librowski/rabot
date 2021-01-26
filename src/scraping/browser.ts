import { env } from 'process';
import { Browser, launch, Page } from 'puppeteer';

export let browser: Browser, page: Page;

export const initBrowser = async (): Promise<void> => {
    browser = await launch({
        defaultViewport: {
            width: 1000,
            height: 1080,
        },
        executablePath: env.CHROME_PATH
    });

    page = await browser.newPage();

    page.setRequestInterception(true);
    page.on('request', (request) => {
        if (['image', 'font'].includes(request.resourceType())) {
            request.abort();
        }
        else {
            request.continue();
        }
    });
};