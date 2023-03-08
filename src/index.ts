import * as dotenv from "dotenv";
import { Telegraf } from "telegraf";
import { message } from "telegraf/filters";
import { BotCommand } from "telegraf/typings/core/types/typegram";
import addCommand from "../commands/bot/add";
import divideCommand from "../commands/bot/divide";
import multiplyCommand from "../commands/bot/multiply";
import subtractCommand from "../commands/bot/subtract";

dotenv.config();

const bot = new Telegraf(process.env.BOT_TOKEN as string);

//Unknown command handler
//alternate
// bot.hears(/^(?!(.*\/add)|(.*\/subtract)|(.*\/multiply)|(.*\/divide)|(.*\/help)).*$/,(ctx)=>{
//     return ctx.reply("Sorry, can't understand your command")
// })

//Unknown commands
bot.on(message("text"), (ctx, next) => {
  const commandRegex =
    /^(?!(.*\/add)|(.*\/subtract)|(.*\/multiply)|(.*\/divide)|(.*\/start)|(.*\/help)).*$/;
  if (commandRegex.test(ctx.message.text)) {
    return ctx.reply("Sorry, can't understand your command.");
  } else {
    return next();
  }
});

// Global Commands
bot.start(async (ctx) => {
  ctx.reply(
    `Hello ${ctx.update.message.from.first_name} 😃, PH_124 bot at your service.`
  );
  let botCommands: Array<BotCommand> = [];
  await ctx.telegram
    .getMyCommands()
    .then((data) => {
      botCommands = data;
    })
    .catch((err: Error) => {
      console.log(err);
    });

  const unformattedCommands = botCommands.map((item) => {
    return `\n/${item.command}: ${item.description}`;
  });

  const formattedCommands = unformattedCommands.join("");


  const message = `PH_124_BOT helps you perform quick calculations on any two numbers.\n\nYou can control me using the following commands:\n${formattedCommands}
        `;

   ctx.reply(message);
  
});

bot.help(async (ctx) => {
  //get all commands available on bot
  let botCommands: Array<BotCommand> = [];
  await ctx.telegram
    .getMyCommands()
    .then((data) => {
      botCommands = data;
    })
    .catch((err: Error) => {
      console.log(err);
    });
  const unformattedCommands = botCommands.map((item) => {
    return `\n/${item.command}: ${item.description}`;
  });

  const formattedCommands = unformattedCommands.join("");

  //insert into template
  const message = `PH_124_BOT helps you perform quick calculations on any two numbers.\n\nYou can control me using the following commands:\n${formattedCommands}
        `;
  //return template
  return ctx.reply(message);
});



bot.command("add", addCommand)
bot.command("subtract", subtractCommand)
bot.command("multiply",multiplyCommand)
bot.command("divide", divideCommand)


bot.launch();
