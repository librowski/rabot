import { Message } from 'telegraf/typings/telegram-types';

export const isTextMessage
    = (message: Message): message is Message.TextMessage =>
        'text' in message;