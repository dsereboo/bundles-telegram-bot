import { Composer } from "telegraf";
import { message } from "telegraf/filters";
import dataOptions from "../../../actions/bundles/dataOptions";
import pinValidation from "../../../actions/bundles/pinValidation";
import start from "../../../commands/global/start";
import { BotSession } from "../../../types/common";
import { suspendUser } from "../../../utils/NetworkFunctions";

//Buy data step 1
export const startDataWizard = new Composer<BotSession>();
startDataWizard.on(message("text"), async (ctx) => {
  ctx.reply("Welcome to Vodafone Offers.\nSelect an operation", {
    reply_markup: {
      inline_keyboard: [
        [{ text: "Buy Data", callback_data: "buy" }],
        [{ text: "Check Bundle", callback_data: "check" }],
        [{ text: "Stop Auto-Renewal", callback_data: "gift" }],
        [{ text: "Bundle For Someone", callback_data: "bundle" }],
        [{ text: "SMS Packs", callback_data: "sms" }],
        [{ text: "Check 4G Status", callback_data: "4G" }],
      ],
    },
  });
  ctx.scene.session.pinTries = 0;
  return ctx.wizard.next();
});

//Buy data step 2
export const selectBundle = new Composer<BotSession>();
selectBundle.action(
  ["buy", "check", "gift", "bundle", "sms", "4G"],
  async (ctx) => {
    //TO-DO: have a function that handles the action.
    ctx.answerCbQuery();
    await dataOptions(ctx);
    return ctx.wizard.next();
  }
);

//Buy data step 3
export const validatePin = new Composer<BotSession>();

validatePin.action(
  [
    "bundleId1",
    "bundleId2",
    "bundleId3",
    "bundleId4",
    "bundleId5",
    "bundleId6",
    "bundleId7",
    "bundleId8",
  ],
  async (ctx) => {
    ctx.answerCbQuery();
    //set user action into session state.
    ctx.scene.session.action = ctx.match?.[0];
    await ctx.reply("Enter your pin", {
      reply_markup: {
        keyboard: [[{ text: "🏠 HOME" }], [{ text: "BUY DATA" }]],
        resize_keyboard: true,
        one_time_keyboard: true,
      },
    });
    ctx.wizard.next();
  }
);

//Buy data step 4
export const buySelectedBundle = new Composer<BotSession>();

buySelectedBundle.hears("🏠 HOME", async (ctx) => {
  await ctx.scene.leave();
  start(ctx);
});

buySelectedBundle.on(message("text"), async (ctx) => {
  let num = parseInt(ctx.message.text);
  ++ctx.scene.session.pinTries;
  if (Number.isNaN(num)) {
    if (ctx.scene.session.pinTries > 3) {
      ctx.reply(
        "🚫 You have exhausted the number of tries.\nKindly contact your service provider"
      );
      await suspendUser(4, "");
    } else {
      await ctx.reply(
        "❗Invalid pin.\nYour pin should be a four digit number\ne.g 1809\n\nEnter your pin again"
      );
      ctx.wizard.selectStep(3);
    }
  } else {
    if (
      ctx.scene.session.pinTries > 3 &&
      ctx.scene?.current?.id === "buy data"
    ) {
      await ctx.reply(
        "🚫 You have exhausted the number of tries.\nKindly contact your service provider",
        {
          reply_markup: {
            keyboard: [[{ text: "🏠 HOME" }]],
            resize_keyboard: true,
            one_time_keyboard: true,
          },
        }
      );
      //default user to suspend is user with user ID 3
      await suspendUser(3, "");
      ctx.scene.leave();
    } else {
      await pinValidation(ctx, num);
      if (ctx.message && ctx.message.message_id) {
        await ctx.deleteMessage();
      }
      // return ctx.scene.reenter()
    }
  }
});
