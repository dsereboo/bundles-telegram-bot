import { HelpContext } from "../../types/common";

export default async function help(ctx: HelpContext) {
  const message = `PH_124_BOT helps you buy data bundles or perform quick calculations on any two numbers.\n\nYou can control me using any of the menu options show below`;

  ctx.reply(`${message}`, {
    reply_markup: {
      keyboard: [[{ text: "CALCULATOR" }], [{ text: "BUY DATA" }]],
      resize_keyboard: true,
      one_time_keyboard: true,
    },
  });
}
