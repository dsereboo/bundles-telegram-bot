import * as dotenv from "dotenv";
import { Telegraf } from "telegraf";
import { message } from "telegraf/filters";
import { BotCommand } from "telegraf/typings/core/types/typegram";
import { AddItems, DivideItems, MultiplyItems, SubtractItems } from "../utils/Operations";


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
      //assert as arror
      console.log(err);
    });
  //have a message template
  const unformattedCommands = botCommands.map((item) => {
    return `\n/${item.command}: ${item.description}`;
  });

  const formattedCommands = unformattedCommands.join("");

  //insert into template
  const message = `PH_124_BOT helps you perform quick calculations on any two numbers.\n\nYou can control me using the following commands:\n${formattedCommands}
        `;
  //return template
   ctx.reply(message);
  //return message about commands with inline buttons
  
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
      //assert as arror
      console.log(err);
    });
  //have a message template
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





//Add
bot.command("add", (ctx) => {
  let input = ctx.message.text;

  let inputArray = input.split(" ");

  if (inputArray.length > 1){
    const params = inputArray.slice(1)
    const nums= params.map((str)=>{return parseInt(str)})

    if(nums.includes(NaN)){
        return ctx.reply('Invalid input! 😢 Please try again')
    }
    else{
        const sum = nums.reduce(AddItems,0)
        return ctx.reply(`Result is ${sum}`)
    }
  }
  return ctx.reply(`result`);
});

//Subtract
bot.command("subtract", (ctx)=>{
    let input = ctx.message.text;

    let inputArray = input.split(" ");
  
    if (inputArray.length > 1){
      const params = inputArray.slice(1)
      const nums= params.map((str)=>{return parseInt(str)})
  
      if(nums.includes(NaN)){
          return ctx.reply('Invalid input! 😢 Please try again')
      }
      else{
          const difference = nums.reduce(SubtractItems)
          return ctx.reply(`Result is ${difference}`)
      }
    }
    return ctx.reply(`result`);
})

//Multiply
bot.command("multiply", (ctx)=>{
    let input = ctx.message.text;

    let inputArray = input.split(" ");
  
    if (inputArray.length > 1){
      const params = inputArray.slice(1)
      const nums= params.map((str)=>{return parseInt(str)})
  
      if(nums.includes(NaN)){
          return ctx.reply('Invalid input! 😢 Please try again')
      }
      else{
          const product = nums.reduce(MultiplyItems)
          return ctx.reply(`Result is ${product}`)
      }
    }
    return ctx.reply(`result`);
})

//Divide
bot.command ("divide", (ctx)=>{
    let input = ctx.message.text;

    let inputArray = input.split(" ");
  
    if (inputArray.length > 1){
      const params = inputArray.slice(1)
      const nums= params.map((str)=>{return parseInt(str)})
  
      if(nums.includes(NaN)){
          return ctx.reply('Invalid input! 😢 Please try again')
      }
      else{
          const sum = nums.reduce(DivideItems)
          return ctx.reply(`Result is ${sum}`)
      }
    }
    return ctx.reply(`result`);
})

bot.launch();
