//Packages
import * as dotenv from "dotenv";
import { Telegraf, Scenes, session } from "telegraf";
import { message } from "telegraf/filters";

//Utils
// import { logger } from "../utils/Pino"
import { winstonLogger } from "../utils/Winston";

//Types
import { BotSession } from "../types/common";

//commands
import help from "../commands/global/help";
import start from "../commands/global/start";

//menus
import {
  startDataWizard,
  selectBundle,
  validatePin,
  buySelectedBundle,
} from "./menus/bundles";

import {
  startCalcWizard,
  firstInputPrompt,
  secondInputPrompt,
  processInput,
} from "./menus/calculator";

import {
  comparePin,
  confirmDetails,
  setPin,
  startOnboarding,
  verifyOtp,
} from "./menus/onboarding";

dotenv.config();


const bot: Telegraf<BotSession> = new Telegraf(process.env.BOT_TOKEN as string);

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

const registerUserScene = new Scenes.WizardScene<BotSession>(
  "register",
  startOnboarding,
  setPin,
  comparePin,
  confirmDetails,
  verifyOtp
)

//stage and scene registration
const stage = new Scenes.Stage([buyDataScene, calculatorScene, registerUserScene]);

stage.use((ctx,next)=>{
  winstonLogger.info('Stage Update',{...ctx.update, updateTpe:ctx.updateType})
  next()
})

stage.hears(["BUY DATA", "CALCULATOR", "🏠 HOME", "REGISTER"], async (ctx) => {
  if (ctx.message.text === "🏠 HOME") {
    await ctx.scene.leave();
    //start bot all over together
    start(ctx)
  } else {
    ctx.scene.enter(ctx?.message?.text.toLocaleLowerCase());
  }
});

stage.on(message("contact"), async (ctx) => {
      ctx.scene.enter("register")
  })

// Global Commands
bot.start(start);
bot.help(help);

//middleware
bot.use(session());
bot.use(stage.middleware());
bot.use((ctx,next)=>{
    // logger.info(ctx.update)
    winstonLogger.info('Bot Update',{...ctx.update, updateTpe:ctx.updateType})
    next()
})

bot.action("register",async (ctx) => {
    ctx.answerCbQuery()
    ctx.scene.enter("register")
} )

//Invalid input
bot.on(message("text"), (ctx) => {
  ctx.reply("❗Action not found.\n\nChoose an action from the menu below", {
    reply_markup: {
      keyboard: [[{ text: "CALCULATOR" }], [{ text: "BUY DATA" }]],
      resize_keyboard: true,
      one_time_keyboard: true,
    },
  });
});

//Start bot
bot.launch();
