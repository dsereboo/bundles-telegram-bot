import { BotSession } from "../../types/common";
import { SubtractItems } from "../../utils/Operations";

export default async function subtractCommand (ctx:BotSession){
  let input = ctx.scene.session.numbers

    if (input.includes(NaN)) {
      return ctx.reply("❗Invalid input! 😢 Please try again");
    } else {
      const difference = input.reduce(SubtractItems);
      return ctx.reply(`Result is ${difference}\n\nSelect an operation from the menu below`, {
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

