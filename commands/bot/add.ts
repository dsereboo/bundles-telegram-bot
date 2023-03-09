import { BotSession } from "../../types/common";
import { AddItems, parseNums } from "../../utils/Operations";
import { StartContext } from "../global/start";

export default function addCommand(ctx: BotSession) {
  let input = parseNums(ctx?.session?.firstNum, ctx?.session?.secondNum);

  if (input.includes(NaN)) {
    return ctx.reply("Invalid input! 😢 Please try again");
  } else {
    const sum = input.reduce(AddItems, 0);
    return ctx.reply(`Result is ${sum}`);
  }
}
