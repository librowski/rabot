import * as _ from 'lodash/fp';
import { Message } from 'telegraf/typings/telegram-types';

export const isTextMessage
    = (message: Message): message is Message.TextMessage =>
        'text' in message;

const escapeRegex = /[_*\[\]()~`>#+-=|{}!]/g;
export const parseJobs = _.map(
    _.mapValues(
        (text: string) => text.replace(escapeRegex, '\\$&')
    )
);