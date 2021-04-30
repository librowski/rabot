import { Markup, Scenes } from 'telegraf';
import { RabotContext } from '../../../types';
import { Scene } from '../../constants';
import { getLocationData } from '../../getLocationData';
import { isTextMessage } from '../../utils';
import { searchJobsFromAllPortals } from './searchJobsFromAllPortals';

export const jobsScene = new Scenes.WizardScene<RabotContext>(
    Scene.SEARCH_JOBS,
    async (ctx) => {
        const { message } = ctx;

        if (!isTextMessage(message)) {
            return;
        }

        ctx.state.keyword = message.text;

        const locationButton = Markup.button.locationRequest(
            'Choose my current location',
            true
        );

        await ctx.replyWithMarkdownV2(
            'Alrighty, now I need to ask you for a job location\\.',
            {
                reply_markup: {
                    keyboard: [[
                        locationButton
                    ]],
                    one_time_keyboard: true,
                }
            }
        );

        return ctx.wizard.next();
    },
    async (ctx) => {
        const { message, state: { keyword } } = ctx;
        await ctx.reply(
            'Let\'s see...',
        );

        console.log(getLocationData(ctx.latitude, ctx.longitude));

        if (!isTextMessage(message)) {
            return;
        }

        const location = message.text;

        try {
            const jobs = await searchJobsFromAllPortals(keyword, location);

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