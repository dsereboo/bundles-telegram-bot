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

export async function welcome (ctx:BotSession){
  ctx.reply("Welcome to Vodafone Offers.\nSelect an operation", {
    reply_markup: {
      inline_keyboard: [
        [{ text: "Buy Data", callback_data: "buy", }],
        [{ text: "Check Bundle", callback_data: "check" }],
        [{ text: "Stop Auto-Renewal", callback_data: "gift" }],
        [{ text: "Bundle For Someone", callback_data: "bundle" }],
        [{ text: "SMS Packs", callback_data: "sms" }],
        [{ text: "Check 4G Status", callback_data: "4G" }],
      ],
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
    case "bundleId1":
      return 1;
    case "bundleId2":
      return 2;
    case "bundleId3":
      return 3;
    case "bundleId4":
      return 4;
    case "bundleId5":
      return 5;
    case "bundleId6":
      return 6;
    case "bundleId7":
      return 7;
    case "bundleId8":
      return 8;
    default:
      //item was not found
      return 0;
  }
}

