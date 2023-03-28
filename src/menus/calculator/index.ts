import { Composer } from "telegraf";
import { message } from "telegraf/filters";
import addCommand from "../../../actions/calculator/add";
import divideCommand from "../../../actions/calculator/divide";
import multiplyCommand from "../../../actions/calculator/multiply";
import subtractCommand from "../../../actions/calculator/subtract";
import { BotSession } from "../../../types/common";

//Calculator step 1
export const startCalcWizard = new Composer<BotSession>();
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

//Calculator Step 2
export const firstInputPrompt = new Composer<BotSession>();
firstInputPrompt.on(message("text"), async (ctx) => {
  ctx.scene.session.action = ctx?.message?.text;
  ctx.reply("Enter the first number\ne.g. 23");
  return ctx.wizard.next();
});

//Calculator Step 3
export const secondInputPrompt = new Composer<BotSession>();
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

//Calculator Step 4
export const processInput = new Composer<BotSession>();
processInput.on(message("text"), async (ctx) => {
  let number = parseInt(ctx?.message?.text);
  ctx.scene.session.numbers = [...ctx.scene.session.numbers, number];

  switch (ctx?.scene?.session?.action) {
    case "Add":
      await addCommand(ctx);
      ctx.scene.leave();
      break;
    case "Subtract":
      await subtractCommand(ctx);
      ctx.scene.leave();
      break;
    case "Divide":
      await divideCommand(ctx);
      ctx.scene.leave();
      break;
    case "Multiply":
      await multiplyCommand(ctx);
      ctx.scene.leave();
      break;
  }
});
