import { Scenes, session, Telegraf } from 'telegraf';
import { jobsScene } from './bot/commands/jobs/jobs';
import { Scene } from './bot/constants';
import { initDB } from './db/db';
import { isUserSaved, saveUser } from './db/users';
import { initBrowser } from './scraping/browser';
import { RabotContext } from './types';
const { Stage } = Scenes;
const { BOT_TOKEN } = process.env;

(async () => {
    await initBrowser();
    await initDB();

    const bot = new Telegraf<RabotContext>(BOT_TOKEN, {

    });

    const stage = new Stage([
        jobsScene
    ]);
    bot.use(session());
    bot.use(stage.middleware());

    bot.start(async (ctx) => {
        const { from: user } = ctx;
        const { first_name, id } = user;
        if (await isUserSaved(id)) {
            ctx.reply(
                `Welcome back ${first_name}. What are we looking for this time?`
            );
        } else {
            saveUser(user);
            ctx.reply('Welcome. Use /jobs so I can help you out!');
        }
    });

    bot.command('/jobs', ({ scene }) => { scene.enter(Scene.SEARCH_JOBS); });

    bot.launch();
})();