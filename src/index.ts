import * as dotenv from "dotenv";
import { Telegraf, Scenes, Composer, session } from "telegraf";
import { message } from "telegraf/filters";
import dataOptions from "../actions/bundles/dataOptions";
import pinValidation from "../actions/bundles/pinValidation";
import addCommand from "../commands/bot/calculator/add";
import divideCommand from "../commands/bot/calculator/divide";
import multiplyCommand from "../commands/bot/calculator/multiply";
import subtractCommand from "../commands/bot/calculator/subtract";
import help from "../commands/global/help";
import start from "../commands/global/start";
import { BotSession} from "../types/common";

dotenv.config();

const bot: Telegraf<BotSession> = new Telegraf(process.env.BOT_TOKEN as string);

//Buy data step 1
const startDataWizard = new Composer<BotSession>();
startDataWizard.on(message("text"), async (ctx) => {
  ctx.reply("Welcome to Vodafone Offers.\nSelect an operation", {
    reply_markup: {
      inline_keyboard: [
        [{ text: "Buy Data", callback_data: "buy", }],
        [{ text: "Check Bundle", callback_data: "check" }],
        [{ text: "Stop Auto-Renewal", callback_data: "gift" }],
        [{ text: "Bundle For Someone", callback_data: "bundle" }],
        [{ text: "SMS Packs", callback_data: "sms" }],
        [{ text: "Check 4G Status", callback_data: "4G" }],
      ],
    },
  });
  ctx.scene.session.pinTries=0
  return ctx.wizard.next()
});

//Buy data step 3
const selectBundle = new Composer<BotSession>();
selectBundle.action(["buy","check","gift","bundle","sms","4G"], async(ctx)=>{
  //have a function that handles the action.
  await dataOptions(ctx)
  return ctx.wizard.next()
})


//Enter pin step 3
const validatePin = new Composer<BotSession>();

validatePin.action(["purchase1","purchase2"], async(ctx)=>{
  //set user action into session state.
  ctx.scene.session.action=ctx.match?.[0]
  await ctx.reply("Enter your pin")
  ctx.wizard.next()
})


const buySelectedBundle = new Composer<BotSession>();

buySelectedBundle.on(message("text"), async(ctx)=>{
  let num = parseInt(ctx.message.text)
  console.log(ctx.wizard.cursor)
  ++ctx.scene.session.pinTries
  if(Number.isNaN(num)){
    if(ctx.scene.session.pinTries>=3){
      ctx.reply("You have exhausted the number of tries.\nKindly contact your service provider")
      //TO-DO: send request to change account status 
    }else{
      await ctx.reply("Invalid pin.\nYour pin should be a four digit number\ne.g 1809\n\nEnter your pin again")  
      ctx.wizard.selectStep(3);
    } 
  }
  else{
    if(ctx.scene.session.pinTries>=3){
      ctx.reply("You have exhausted the number of tries.\nKindly contact your service provider")
       //TO-DO: send request to change account status 
    }else{
      await pinValidation(ctx, num)
      // return ctx.scene.reenter()
    } 
  }
})


//Calculator step 1
const startCalcWizard = new Composer<BotSession>();
startCalcWizard.on(message("text"), async (ctx) => {
  ctx.reply(
    `Hello, I can perform addition, subtraction and multiplication on two numbers.\n\nChoose an operation from the options below: `,
    {
      reply_markup: {
        keyboard: [
          [{ text: "Add" }],
          [{ text: "Subtract" }],
          [{ text: "Multiply" }],
          [{ text: "Divide" }],
        ],
        resize_keyboard: true,
        one_time_keyboard: true,
      },
    }
  );
  return ctx.wizard.next();
});

const firstInputPrompt = new Composer<BotSession>();
firstInputPrompt.on(message("text"), async (ctx) => {
  ctx.scene.session.action = ctx?.message?.text;
  ctx.reply("Enter the first number\ne.g. 23");
  return ctx.wizard.next();
});


const secondInputPrompt = new Composer<BotSession>();
secondInputPrompt.on(message("text"), async (ctx) => {
 
  let number = parseInt(ctx?.message?.text);
  if(Number.isNaN(number)){
    ctx.reply("❗Invalid input. Your input should be a number.\ne.g 23.\n\nEnter first number again");
    return ctx.wizard.selectStep(2)
  }else{
    ctx.scene.session.numbers = [number];
    ctx.reply("Enter Second Number\ne.g. 20");
    return ctx.wizard.next();
  } 
});


const processInput = new Composer<BotSession>();
processInput.on(message("text"), async (ctx) => {
  let number = parseInt(ctx?.message?.text);
  ctx.scene.session.numbers = [...ctx.scene.session.numbers, number];

  switch (ctx?.scene?.session?.action) {
    case "Add":
      await addCommand(ctx);
      ctx.scene.reenter();
      break;
    case "Subtract":
      await subtractCommand(ctx);
      ctx.scene.reenter();
      break;
    case "Divide":
      await divideCommand(ctx);
      ctx.scene.reenter();
      break;
    case "Multiply":
      await multiplyCommand(ctx);
      ctx.scene.reenter();
      break;
  }
});

//scenes
const buyDataScene = new Scenes.WizardScene<BotSession>(
  "buy data",
  startDataWizard,
  selectBundle,
  validatePin,
  buySelectedBundle
);

const calculatorScene = new Scenes.WizardScene<BotSession>(
  "calculator",
  startCalcWizard,
  firstInputPrompt,
  secondInputPrompt,
  processInput
);

//stage
//TO-DO:validate this line of code
const stage = new Scenes.Stage([buyDataScene]);

//scene registration
stage.register(buyDataScene);
stage.register(calculatorScene);

// Global Commands
bot.start(start);
bot.help(help);


//middleware
bot.use(session());
bot.use(stage.middleware());

//Listener
bot.hears(["BUY DATA", "CALCULATOR"], (ctx) => {
  ctx.scene.enter(ctx?.message?.text.toLocaleLowerCase());
});

bot.launch();
