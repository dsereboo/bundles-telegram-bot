//Unknown command handler
//alternate
// bot.hears(/^(?!(.*\/add)|(.*\/subtract)|(.*\/multiply)|(.*\/divide)|(.*\/help)).*$/,(ctx)=>{
//     return ctx.reply("Sorry, can't understand your command")
// })


// export default function unknown(ctx, next) {
//   const commandRegex =
//     /^(?!(.*\/add)|(.*\/subtract)|(.*\/multiply)|(.*\/divide)|(.*\/start)|(.*\/help)).*$/;
//   if (commandRegex.test(ctx.message.text)) {
//     return ctx.reply("Sorry, can't understand your command.");
//   } else {
//     return next();
//   }
// }


// ctx.session ??= {action:" "}
// ctx.session ??= {action:" "}
// ctx.session ??= {action:" "}
// ctx.session ??= {action:" "}

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

//Unknown commands
// bot.on(message("text"), (ctx, next) => {
//   const commandRegex =
//     /^(?!(.*\/add)|(.*\/subtract)|(.*\/multiply)|(.*\/divide)|(.*\/start)|(.*\/help)).*$/;
//   if (commandRegex.test(ctx.message.text)) {
//     return ctx.reply("Sorry, can't understand your command.");
//   } else {
//     return next();
//   }
// });



//Listener
// bot.on(message("text"), async(ctx)=>{
//     switch (ctx?.session?.action.toLocaleLowerCase()){
//         case "add":
//             await addCommand(ctx)
//             ctx.session = {action:" "}
//             break;
//         case "subtract":
//             await subtractCommand(ctx)
//             ctx.session = {action:" "}
//             break;
//         case "divide":
//             await divideCommand(ctx)
//             ctx.session = {action:" "}
//             break;
//         case "multiply":
//             await multiplyCommand(ctx)
//             ctx.session = {action:" "}
//             break;
//         default:
//            await ctx.reply("❗Invalid action. Please try again")
//     }
//     //clear action

//     //Another operation
//     ctx.reply("What will be your next operation?", {
//         reply_markup: {
//           keyboard: [
//               [
//                   { text: "Add",   },
//               ],
//               [
//                 { text: "Subtract", },
//               ],
//               [
//                 { text: "Multiply", },
//               ],
//               [
//                 { text: "Divide",},
//               ]
//           ],
//           resize_keyboard:true,
//           one_time_keyboard:true,
//         },
//       })
//       //Another operation(after a number of operations)
//     //Terminate session
//     //Reshow operations.
//     //auto trigger number keyboard when button is clicked???
// })

 // ctx.session.firstNum !== ""
  //   ? 
  //   (
      
  //     number !== NaN? " ": ""
  //   )
  //   : (ctx.session = { ...ctx.session, firstNum: ctx.message.text });

  // if (ctx?.session?.secondNum !== "") {
  //   switch (ctx?.session?.action) {
  //     case "Add":
  //       await addCommand(ctx);
  //       ctx.session = defaultSession;
  //       nextOperationReply(ctx)
  //       break;
  //     case "Subtract":
  //       await subtractCommand(ctx);
  //       ctx.session = defaultSession;
  //       nextOperationReply(ctx)
  //       break;
  //     case "Divide":
  //       await divideCommand(ctx);
  //       ctx.session = defaultSession;
  //       nextOperationReply(ctx)
  //       break;
  //     case "Multiply":
  //       await multiplyCommand(ctx);
  //       ctx.session = defaultSession;
  //       nextOperationReply(ctx)
  //       break;
  //     default:
  //       await ctx.reply("❗Invalid action. Please try again");
  //       nextOperationReply(ctx)
  //   }
  // } else {
  //   ctx.reply("Enter second number\ne.g 24");
  // }


  /if parse fails throw reply
  // if(Number.isNaN(number)){
  //   await ctx.reply("❗Invalid input. Your input should be a number.\ne.g 23");
  //   nextOperationReply(ctx)
  // }
  // else if(Number.isInteger(number) && ctx.session.firstNum == "" ){
  //      ctx.session = { ...ctx.session, firstNum: ctx.message.text }
  // }
  // else if(Number.isInteger(number) && ctx.session.firstNum !== ""){
  //   ctx.session = { ...ctx.session, secondNum: ctx.message.text }
  // }
  // else if(ctx.session.firstNum !== "" && ctx?.session?.secondNum !== ""){
  //   console.log(ctx.session)
  //      switch (ctx?.session?.action) {
  //     case "Add":
  //       await addCommand(ctx);
  //       ctx.session = defaultSession;
  //       nextOperationReply(ctx)
  //       break;
  //     case "Subtract":
  //       await subtractCommand(ctx);
  //       ctx.session = defaultSession;
  //       nextOperationReply(ctx)
  //       break;
  //     case "Divide":
  //       await divideCommand(ctx);
  //       ctx.session = defaultSession;
  //       nextOperationReply(ctx)
  //       break;
  //     case "Multiply":
  //       await multiplyCommand(ctx);
  //       ctx.session = defaultSession;
  //       nextOperationReply(ctx)
  //       break;
  //     default:
  //       await ctx.reply("❗Invalid action. Please try again");
  //       nextOperationReply(ctx)
  //   }
  // }
  // else{
  //   ctx.reply("Enter second number\ne.g 23")
  // }
  // })