import { BotSession } from "../../../types/common";
import { DivideItems } from "../../../utils/Operations";

export default function divideCommand(ctx: BotSession) {
  let input = ctx.scene.session.numbers

  if (input.includes(NaN)) {
    ctx.reply("Invalid input! 😢 Please try again");
  } else {
    const quotient = input.reduce(DivideItems);
    ctx.reply(`Result is ${quotient}`);
  }
}
