//Unknown command handler
//alternate
// bot.hears(/^(?!(.*\/add)|(.*\/subtract)|(.*\/multiply)|(.*\/divide)|(.*\/help)).*$/,(ctx)=>{
//     return ctx.reply("Sorry, can't understand your command")
// })


export default function unknown(ctx, next) {
  const commandRegex =
    /^(?!(.*\/add)|(.*\/subtract)|(.*\/multiply)|(.*\/divide)|(.*\/start)|(.*\/help)).*$/;
  if (commandRegex.test(ctx.message.text)) {
    return ctx.reply("Sorry, can't understand your command.");
  } else {
    return next();
  }
}


ctx.session ??= {action:" "}
ctx.session ??= {action:" "}
ctx.session ??= {action:" "}
ctx.session ??= {action:" "}

// bot.action("Add", (ctx) => {
//   ctx.answerCbQuery();
//   ctx.session ??= {action:" "}
//   ctx.session.action="add"
//   ctx.reply("Enter the two numbers for addition");
// });

// bot.action("Subtract", (ctx) => {
//     ctx.answerCbQuery();
//     ctx.session ??= {action:" "}
//     ctx.session.action="subtract"
//     ctx.reply("Enter the two numbers for subtraction");
// });

// bot.action("Multiply", (ctx) => {
//     ctx.answerCbQuery();
//     ctx.session ??= {action:" "}
//     ctx.session.action="multiply"
//     ctx.reply("Enter the two numbers for mutliplication");
// });

// bot.action("Divide", (ctx) => {
//     ctx.answerCbQuery();
//     ctx.session ??= {action:" "}
//     ctx.session.action="divide"
//     ctx.reply("Enter the two numbers for division");
// });