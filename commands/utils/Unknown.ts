//Unknown command handler
//alternate
// bot.hears(/^(?!(.*\/add)|(.*\/subtract)|(.*\/multiply)|(.*\/divide)|(.*\/help)).*$/,(ctx)=>{
//     return ctx.reply("Sorry, can't understand your command")
// })


//Unknown commands
// bot.on(message("text"), (ctx, next) => {
//     const commandRegex =
//       /^(?!(.*\/add)|(.*\/subtract)|(.*\/multiply)|(.*\/divide)|(.*\/help)).*$/;
//     if (commandRegex.test(ctx.message.text)) {
//       return ctx.reply("Sorry, can't understand your command.")
//     } else {
//       return next()
//     }
//   });