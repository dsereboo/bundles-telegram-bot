import { BotSession } from "../../types/common";
import { MultiplyItems, parseNums } from "../../utils/Operations";

export default function multiplyCommand (ctx:BotSession){
    let input = parseNums(ctx?.session?.firstNum, ctx?.session?.secondNum);

    if (input.includes(NaN)) {
      return ctx.reply("Invalid input! 😢 Please try again");
    } else {
      const product = input.reduce(MultiplyItems);
      return ctx.reply(`Result is ${product}`);
    }
}

