import { BotSession } from "../types/common";

export function nextOperationReply(ctx: BotSession) {
  ctx.reply("Select the next operation", {
    reply_markup: {
      keyboard: [
        [{ text: "Add" }],
        [{ text: "Subtract" }],
        [{ text: "Multiply" }],
        [{ text: "Divide" }],
      ],
      resize_keyboard: true,
      one_time_keyboard: true,
    },
  });
}
export function parseNums(firstNum: string, secondNum: string) {
  let first = parseInt(firstNum);
  let second = parseInt(secondNum);
  return [first, second];
}

export function AddItems(accumulator: number, currentValue: number) {
  return accumulator + currentValue;
}

export function SubtractItems(accumulator: number, currentValue: number) {
  return accumulator - currentValue;
}

export function MultiplyItems(accumulator: number, currentValue: number) {
  return accumulator * currentValue;
}

export function DivideItems(accumulator: number, currentValue: number) {
  return accumulator / currentValue;
}

export function findBundleId(purchaseType: string) {
  switch (purchaseType) {
    case "purchase1":
      return 1;
    case "purchase2":
      return 2;
    case "purchase3":
      return 3;
    case "purchase4":
      return 4;
    case "purchase5":
      return 5;
    case "purchase6":
      return 6;
    default:
      //item was not found
      return 0;
  }
}

