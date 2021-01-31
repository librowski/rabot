import { Scenes } from 'telegraf';
import { RabotContext } from '../../../types';
import { Scene } from '../../constants';
import { isTextMessage } from '../../utils';
import { searchJobsFromAllPortals } from './searchJobsFromAllPortals';

export const jobsScene = new Scenes.WizardScene<RabotContext>(
    Scene.SEARCH_JOBS,
    async (ctx) => {
        const { message } = ctx;
        await ctx.reply('Let\'s see...');

        if (!isTextMessage(message)) {
            return;
        }

        const keyword = message.text;
        try {
            const jobs = await searchJobsFromAllPortals(keyword, '');

            ctx.reply(
                'Here you are my dear 😘:\n\n'.concat(
                    jobs.map(({ title, link, company }) =>
                        `*[${title} at ${company}](${link})*`
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
        }

        return ctx.scene.leave();
    }
);

jobsScene.enter(
    (ctx) => {
        ctx.reply('Okay, what are you looking for? Just give me a keyword.');
    },
);