import { BotSession } from "../../types/common";
import { DivideItems, parseNums } from "../../utils/Operations";

export default function divideCommand(ctx: BotSession) {
  let input = parseNums(ctx?.session?.firstNum, ctx?.session?.secondNum);

  if (input.includes(NaN)) {
    ctx.reply("Invalid input! 😢 Please try again");
  } else {
    const quotient = input.reduce(DivideItems);
    ctx.reply(`Result is ${quotient}`);
  }
}
