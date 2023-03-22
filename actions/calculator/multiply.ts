import { BotSession } from "../../types/common";
import { MultiplyItems, parseNums } from "../../utils/Operations";

export default async function multiplyCommand (ctx:BotSession){
  let input = ctx.scene.session.numbers

    if (input.includes(NaN)) {
      return ctx.reply("❗Invalid input! 😢 Please try again");
    } else {
      const product = input.reduce(MultiplyItems);
      return ctx.reply(`Result is ${product}\n\nSelect an operation from the menu below`, {
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

