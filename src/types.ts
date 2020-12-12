import { Scenes } from 'telegraf';
import { WizardContext } from 'telegraf/typings/scenes';

export type RabotContext = {
    scene: Scenes.SceneContextScene<RabotContext, Scenes.WizardSessionData>;
    wizard: Scenes.WizardContextWizard<RabotContext>;
} & WizardContext