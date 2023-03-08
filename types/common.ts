import Context, { NarrowedContext } from "telegraf/typings/context";
import { Update, CallbackQuery } from "telegraf/typings/core/types/typegram";

export interface BotSession extends Context {
    session: {action:string}
}