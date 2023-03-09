import { NarrowedContext, Context } from "telegraf";
import {
  Update,
  Message,
  BotCommand,
} from "telegraf/typings/core/types/typegram";

type HelpContext = NarrowedContext<
  Context<Update>,
  {
    message: Update.New & Update.NonChannel & Message.TextMessage;
    update_id: number;
  }
>;

export default async function help(ctx: HelpContext) {
  let botCommands: Array<BotCommand> = []

  await ctx.telegram
    .getMyCommands()
    .then((data) => {
      botCommands = data
    })
    .catch((err: Error) => {
      console.log(err)
    })


    
  const unformattedCommands = botCommands.map((item) => {
    return `\n/${item.command}: ${item.description}`
  });

  const formattedCommands = unformattedCommands.join("");

  const message = `PH_124_BOT helps you perform quick calculations on any two numbers.\n\nYou can control me using the following commands:\n${formattedCommands}`
  
  return ctx.reply(message)
}
