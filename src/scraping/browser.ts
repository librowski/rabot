import puppeteer, { Browser, Page } from 'puppeteer';

export let browser: Browser, page: Page;

export const initBrowser = async (): Promise<void> => {
    browser = await puppeteer.launch({
        args: [
            '--no-sandbox'
        ],
        defaultViewport: {
            width: 1000,
            height: 1080,
        },
    });

    page = await browser.newPage();

    page.setRequestInterception(true);
    page.on('request', (request) => {
        if (['image', 'font'].includes(request.resourceType())) {
            request.abort();
        }
        else {request.continue();}
    });
};
