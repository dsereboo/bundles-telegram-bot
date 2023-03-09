import * as dotenv from "dotenv";
import { Telegraf } from "telegraf";
import { message } from "telegraf/filters"
import {session} from "telegraf"
import addCommand from "../commands/bot/add";
import divideCommand from "../commands/bot/divide";
import multiplyCommand from "../commands/bot/multiply";
import subtractCommand from "../commands/bot/subtract";
import help from "../commands/global/help";
import start from "../commands/global/start";
import { BotSession } from "../types/common";

dotenv.config();

const bot: Telegraf<BotSession> = new Telegraf(process.env.BOT_TOKEN as string);

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
           ctx.reply("Invalid action ❗. Please try again")
    }
    //Another operation
    ctx.reply("What will be your next operation?", {
        reply_markup: {
          inline_keyboard: [
              [
                  { text: "Add", callback_data: "Add", },
              ],
              [
                { text: "Subtract", callback_data:"Subtract"},
              ],
              [
                { text: "Multiply", callback_data:"Multiply"},
              ],
              [
                { text: "Divide", callback_data:"Divide"},
              ]
          ],
        },
      })
      //Another operation(after a number of operations)
    //Terminate session
    //Reshow operations.
    //auto trigger number keyboard when button is clicked???
})


bot.launch();
