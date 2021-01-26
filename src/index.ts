import { Scenes, session, Telegraf } from 'telegraf';
import { Scene } from './bot/constants';
import { searchJobsScene } from './bot/setup';
import { setup as setupDB } from './db/setup';
import { initBrowser } from './scraping/browser';
import { RabotContext } from './types';
const { Stage } = Scenes;
const { BOT_TOKEN } = process.env;

(async () => {
    await initBrowser(); 
    await setupDB();

    const bot = new Telegraf<RabotContext>(BOT_TOKEN, {
       
    });

    const stage = new Stage([
        searchJobsScene
    ]);
    bot.use(session());
    bot.use(stage.middleware());

    bot.start((ctx) => ctx.reply('Welcome. Use /jobs so I can help you out!'));

    bot.command('/jobs', ({ scene }) => { scene.enter(Scene.SEARCH_JOBS); });

    bot.launch();
})();