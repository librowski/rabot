import { Scenes } from 'telegraf';
import { logIn } from '../scraping/linkedin/logIn';
import { searchJobs } from '../scraping/linkedin/searchJobs';
import { RabotContext } from '../types';
import { Scene } from './constants';
import { isTextMessage, parseJobs } from './utils';

const getJobs = async (keyword: string) => {
    await logIn();
    const jobs = await searchJobs(keyword);
    return parseJobs(jobs);
};

export const searchJobsScene = new Scenes.WizardScene<RabotContext>(
    Scene.SEARCH_JOBS,
    async (ctx) => {
        const { message } = ctx;
        await ctx.reply('Let\'s see...');

        if (!isTextMessage(message)) {
            return;
        }

        const keyword = message.text;
        try {
            const jobs = await getJobs(keyword);

            ctx.reply(
                'Here you are my dear 😘:\n\n'.concat(
                    jobs.map(({ title, link, metadataItems, company }) =>
                        `*[${title} at ${company}](${link})*\n📍${metadataItems}`
                    ).join('\n\n')
                ),
                {
                    parse_mode: 'MarkdownV2',
                    disable_web_page_preview: true,
                }
            );
        } catch (e) {
            ctx.reply('I\'m very sorry, but something wen\'t wrong.');
            ctx.reply('Contact my admin please...');
            console.error(e);
        }

        return ctx.scene.leave();
    }
);

searchJobsScene.enter(
    (ctx) => {
        ctx.reply('Okay, what are you looking for? Just give me a keyword.');
    },
);