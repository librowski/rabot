import { Scenes } from 'telegraf';
import { WizardContext } from 'telegraf/typings/scenes';
import { JobOffer } from './db/types';

export type RabotContext = {
    scene: Scenes.SceneContextScene<RabotContext, Scenes.WizardSessionData>;
    wizard: Scenes.WizardContextWizard<RabotContext>;
} & WizardContext

export type SearchJobsCallback = (
    keyword: string,
    location: string,
) => Promise<JobOffer[]>;

export type RabotConfig = {
    searchJobsCallbacks: {
        [portalName: string]: SearchJobsCallback
    };
}