import * as dotenv from "dotenv";
import { Telegraf } from "telegraf";
import { message } from "telegraf/filters";
import { session } from "telegraf";
import addCommand from "../commands/bot/add";
import divideCommand from "../commands/bot/divide";
import multiplyCommand from "../commands/bot/multiply";
import subtractCommand from "../commands/bot/subtract";
import help from "../commands/global/help";
import start from "../commands/global/start";
import { BotSession } from "../types/common";
import { nextOperationReply } from "../utils/Operations";

dotenv.config();

const bot: Telegraf<BotSession> = new Telegraf(process.env.BOT_TOKEN as string);
const defaultSession = { action: "", firstNum: "", secondNum: "" };

// Global Commands
bot.start(start);
bot.help(help);

//Commands
bot.command("add", addCommand);
bot.command("subtract", subtractCommand);
bot.command("multiply", multiplyCommand);
bot.command("divide", divideCommand);

//session
bot.use(session());

//actions
bot.action(["Add", "Subtract", "Multiply", "Divide"], (ctx) => {
  ctx.answerCbQuery();
  ctx.session ??= defaultSession;
  ctx.session.action = ctx?.match?.[0];
  ctx.reply(`Enter the two numbers to ${ctx?.match?.[0].toLowerCase()}`);
});

bot.hears(["Add", "Multiply", "Subtract", "Divide"], (ctx) => {
  //set session to operation
  ctx.session ??= defaultSession;
  ctx.session = { ...ctx.session, action: ctx.message.text };
  ctx.reply("Enter first number\ne.g 23");
});

bot.on(message("text"), async (ctx) => {
  let number= parseInt(ctx.message.text)

  //setting session
  if(ctx?.session?.firstNum !== "" && !Number.isNaN(number)){
    ctx.session = { ...ctx.session, secondNum: ctx.message.text }
  }
  else if(ctx?.session?.firstNum === "" && !Number.isNaN(number) && ctx.session.action === "" ){
 
    await ctx.reply("❗Invalid input. Your input should be a number.\ne.g 23");
    ctx.session = defaultSession;
    nextOperationReply(ctx)
  }
  else if(ctx?.session?.firstNum === "" && !Number.isNaN(number) ){
    ctx.reply("Enter second number\ne.g 24");
  }
  
 


  if(ctx?.session?.secondNum !== "" && ctx?.session?.firstNum !== "" ){
    switch (ctx?.session?.action) {
      case "Add":
        await addCommand(ctx);
        ctx.session = defaultSession;
        nextOperationReply(ctx)
        console.log(ctx.session)
        break;
      case "Subtract":
        await subtractCommand(ctx);
        ctx.session = defaultSession;
        nextOperationReply(ctx)
        break;
      case "Divide":
        await divideCommand(ctx);
        ctx.session = defaultSession;
        nextOperationReply(ctx)
        break;
      case "Multiply":
        await multiplyCommand(ctx);
        ctx.session = defaultSession;
        nextOperationReply(ctx)
        break;
      default:
        await ctx.reply("❗Invalid action. Please try again");
        nextOperationReply(ctx)
    }
  }
  else{
    if( !Number.isNaN(number)){
      ctx.session = { ...ctx.session, firstNum: ctx.message.text }
    }
    else{
      await ctx.reply("❗Invalid input. Your input should be a number.\ne.g 23");
      ctx.session = defaultSession;
      nextOperationReply(ctx)
    }   
  }
});


bot.launch();
