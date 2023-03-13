import { BotSession } from "../../../types/common";
import { SubtractItems } from "../../../utils/Operations";

export default function subtractCommand (ctx:BotSession){
  let input = ctx.scene.session.numbers

    if (input.includes(NaN)) {
      return ctx.reply("Invalid input! 😢 Please try again");
    } else {
      const difference = input.reduce(SubtractItems);
      return ctx.reply(`Result is ${difference}`);
    }
}

