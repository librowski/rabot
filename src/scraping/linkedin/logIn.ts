import { page } from '../browser';
import { LINKEDIN_LOGIN_URL } from './constants';
const { LINKEDIN_LOGIN, LINKEDIN_PASSWORD } = process.env;

const inputCredentials = async () => {
    await page.$eval(
        'input#username',
        (el, login) => (el as HTMLInputElement).value = login,
        LINKEDIN_LOGIN
    );

    await page.$eval(
        'input#password',
        (el, password) => (el as HTMLInputElement).value = password,
        LINKEDIN_PASSWORD
    );

    await page.click('[aria-label="Sign in"]');
    await page.waitForNavigation();
};

export const logIn = async (): Promise<void> => {
    const response = await page.goto(LINKEDIN_LOGIN_URL);
    const isRedirected = response.url() !== LINKEDIN_LOGIN_URL;

    if (isRedirected) {
        return;
    }

    await inputCredentials();
};