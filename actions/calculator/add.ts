import { BotSession } from "../../types/common";
import { AddItems } from "../../utils/Operations";


export default function addCommand(ctx: BotSession) {
  let input = ctx.scene.session.numbers

  if (input.includes(NaN)) {
    return ctx.reply("❗Invalid input! 😢 Please try again");
  } else {
    const sum = input.reduce(AddItems, 0);
    return ctx.reply(`Result is ${sum}\n\nSelect an operation from the menu below`,{
      reply_markup: {
        keyboard: [
          [
            { text: "🏠 HOME",  },
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
