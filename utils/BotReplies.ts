import { BotSession } from "../types/common";

export function startReply (ctx:BotSession){
    ctx.reply(
        `Hello 😃, PH_124 bot at your service.\n\nI can help you buy data bundles or perform arithmetic on two numbers.\n\nChoose an operation from the options below: `,
        {
          reply_markup: {
            keyboard: [
              [
                { text: "CALCULATOR",  },
            ],
            [
              { text: "BUY DATA", },
            ],
            ],
            resize_keyboard:true,
            one_time_keyboard:true,
          },
        }
      );
}


// export function nextOperationReply(ctx: BotSession) {
//   ctx.reply("Select the next operation", {
//     reply_markup: {
//       keyboard: [
//         [{ text: "Add" }],
//         [{ text: "Subtract" }],
//         [{ text: "Multiply" }],
//         [{ text: "Divide" }],
//       ],
//       resize_keyboard: true,
//       one_time_keyboard: true,
//     },
//   });
// }

// export async function welcome (ctx:BotSession){
//   ctx.reply("Welcome to Vodafone Offers.\nSelect an operation", {
//     reply_markup: {
//       inline_keyboard: [
//         [{ text: "Buy Data", callback_data: "buy", }],
//         [{ text: "Check Bundle", callback_data: "check" }],
//         [{ text: "Stop Auto-Renewal", callback_data: "gift" }],
//         [{ text: "Bundle For Someone", callback_data: "bundle" }],
//         [{ text: "SMS Packs", callback_data: "sms" }],
//         [{ text: "Check 4G Status", callback_data: "4G" }],
//       ],
//     },
//   });
// }