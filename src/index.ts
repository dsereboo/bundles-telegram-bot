import * as dotenv from "dotenv";
import { Telegraf } from "telegraf";
import { message } from "telegraf/filters"
import {session} from "telegraf"
import addCommand from "../commands/bot/add";
import divideCommand from "../commands/bot/divide";
import multiplyCommand from "../commands/bot/multiply";
import subtractCommand from "../commands/bot/subtract";
import help from "../commands/globals/help";
import start from "../commands/globals/start";
import { BotSession } from "../types/common";

dotenv.config();

const bot: Telegraf<BotSession> = new Telegraf(process.env.BOT_TOKEN as string);



//Unknown commands
// bot.on(message("text"), (ctx, next) => {
//   const commandRegex =
//     /^(?!(.*\/add)|(.*\/subtract)|(.*\/multiply)|(.*\/divide)|(.*\/start)|(.*\/help)).*$/;
//   if (commandRegex.test(ctx.message.text)) {
//     return ctx.reply("Sorry, can't understand your command.");
//   } else {
//     return next();
//   }
// });

// Global Commands
bot.start(start);
bot.help(help);

//Commands
bot.command("add", addCommand)
bot.command("subtract", subtractCommand)
bot.command("multiply",multiplyCommand)
bot.command("divide", divideCommand)

//session
bot.use(session())

//actions
bot.action(["Add", "Subtract", "Multiply", "Divide"], (ctx)=>{
    ctx.answerCbQuery();
    ctx.session ??= {action:" "}
    ctx.session.action=ctx?.match?.[0]
    ctx.reply(`Enter the two numbers to ${ctx?.match?.[0].toLowerCase()}`);
})

//Listener
bot.on(message("text"), (ctx)=>{
    switch (ctx?.session?.action.toLocaleLowerCase()){
        case "add":
            addCommand(ctx)
            break;
        case "subtract":
            subtractCommand(ctx)
            break;
        case "divide":
            divideCommand(ctx)
            break;
        case "multiply":
            multiplyCommand(ctx)
            break;
        default: 
           ctx.reply("Error occured. Restart bot")
    }
})


bot.launch();
