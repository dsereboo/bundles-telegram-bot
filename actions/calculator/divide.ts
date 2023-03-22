import { BotSession } from "../../types/common";
import { DivideItems } from "../../utils/Operations";

export default async function divideCommand(ctx: BotSession) {
  let input = ctx.scene.session.numbers

  if (input.includes(NaN)) {
    ctx.reply("❗Invalid input! 😢 Please try again");
  } else {
    const quotient = input.reduce(DivideItems);
    ctx.reply(`Result is ${quotient}\n\nSelect an operation from the menu below`,{
      reply_markup: {
        keyboard: [
          [
            { text: "🏠 RETURN TO MAIN MENU",  },
        ],
        [
          { text: "CALCULATOR", },
        ],
        ],
        resize_keyboard:true,
        one_time_keyboard:true,
      },
    });
  }
}
