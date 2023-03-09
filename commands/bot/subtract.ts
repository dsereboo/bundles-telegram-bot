import { BotSession } from "../../types/common";
import { parseNums, SubtractItems } from "../../utils/Operations";
import { StartContext } from "../global/start";

export default function subtractCommand (ctx:BotSession){
    let input = parseNums(ctx?.session?.firstNum, ctx?.session?.secondNum);

    if (input.includes(NaN)) {
      return ctx.reply("Invalid input! 😢 Please try again");
    } else {
      const difference = input.reduce(SubtractItems);
      return ctx.reply(`Result is ${difference}`);
    }
}

