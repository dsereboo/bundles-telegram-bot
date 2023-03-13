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


  // /if parse fails throw reply
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

  //actions
// bot.action(["Add", "Subtract", "Multiply", "Divide"], (ctx) => {
//   ctx.answerCbQuery();
//   ctx.session ??= defaultSession;
//   ctx.session.action = ctx?.match?.[0];
//   ctx.reply(`Enter the two numbers to ${ctx?.match?.[0].toLowerCase()}`);
// });

// bot.hears(["Add", "Multiply", "Subtract", "Divide"], (ctx) => {
//   //set session to operation
//   ctx.session ??= defaultSession;
//   ctx.session = { ...ctx.session, action: ctx.message.text };
//   ctx.reply("Enter first number\ne.g 23");
// });

// bot.on(message("text"), async (ctx) => {
//   let number= parseInt(ctx.message.text)

//   //setting session
//   if(ctx?.session?.firstNum !== "" && !Number.isNaN(number)){
//     ctx.session = { ...ctx.session, secondNum: ctx.message.text }
//   }
//   else if(ctx?.session?.firstNum === "" && !Number.isNaN(number) && ctx.session.action === "" ){

//     await ctx.reply("❗Invalid input. Your input should be a number.\ne.g 23");
//     ctx.session = defaultSession;
//     nextOperationReply(ctx)
//   }
//   else if(ctx?.session?.firstNum === "" && !Number.isNaN(number) ){
//     ctx.reply("Enter second number\ne.g 24");
//   }

//   if(ctx?.session?.secondNum !== "" && ctx?.session?.firstNum !== "" ){
//     switch (ctx?.session?.action) {
//       case "Add":
//         await addCommand(ctx);
//         ctx.session = defaultSession;
//         nextOperationReply(ctx)
//         console.log(ctx.session)
//         break;
//       case "Subtract":
//         await subtractCommand(ctx);
//         ctx.session = defaultSession;
//         nextOperationReply(ctx)
//         break;
//       case "Divide":
//         await divideCommand(ctx);
//         ctx.session = defaultSession;
//         nextOperationReply(ctx)
//         break;
//       case "Multiply":
//         await multiplyCommand(ctx);
//         ctx.session = defaultSession;
//         nextOperationReply(ctx)
//         break;
//       default:
//         await ctx.reply("❗Invalid action. Please try again");
//         nextOperationReply(ctx)
//     }
//   }
//   else{
//     if( !Number.isNaN(number)){
//       ctx.session = { ...ctx.session, firstNum: ctx.message.text }
//     }
//     else{
//       await ctx.reply("❗Invalid input. Your input should be a number.\ne.g 23");
//       ctx.session = defaultSession;
//       nextOperationReply(ctx)
//     }
//   }
// });

// const selectBundle=new Composer<BotSession>()
// selectBundle.on(message("text"), async(ctx)=>{
//   //options will be coming from api call here
//   ctx.reply("Select a data bundle",{

//     reply_markup: {
//       keyboard:
//         [
//           { text: "25MB @ GHs0.5",  },
//       ],
//       [
//         { text: "55MB @ GHs1", },
//       ],
//       [
//         { text: "130MB @ GHs2", },
//       ],
//       [
//         { text: "655MB @ GHs5", },
//       ],
//       [
//         { text: "1.2GB @ GHs10", },
//       ],
//       [
//         { text: "2.2GB @ GHs20", },
//       ],
//       [
//         { text: "5.5GB @ GHs50", },
//       ],
//       [
//         { text: "12GB @ GHs`100", },
//       ],
//       [
//         { text: "40GB @ GHs200", },
//       ],
//       ],
//       // resize_keyboard:true,
//       one_time_keyboard:true,
//     },
//   } )
//   return ctx.wizard.next()

// })

//action handler
// bot.action(
//   ["check", "gift", "bundle", "sms", "4G"],
//   async (ctx) => {
//     console.log(ctx?.match?.[0]);
//     switch (ctx?.match?.[0]) {
//       case "4G":
//         //execute 4G check
//         ctx.reply("My 4G status");
//         break;
//       case "buy":
//         //buy data option
//         await dataOptions(ctx);
//         break;
//       case "gift":
//         break;
//       case "bundle":
//         break;
//       case "sms":
//         break;
//       case "purchase":
//         //process purchase request
//         ctx.answerCbQuery()
//         // await purchaseData(ctx);
//         break;
//       case "check":
//         break;
//       default:
//         ctx.reply("Not needed");
//     }
//     //
//     ctx.answerCbQuery();
//     // ctx.session ??= defaultSession;
//     // ctx.session.action = ctx?.match?.[0];
//     // ctx.reply(`Option selected`);
//   }
// );

//Commands
// bot.command("add", addCommand);
// bot.command("subtract", subtractCommand);
// bot.command("multiply", multiplyCommand);
// bot.command("divide", divideCommand);


//Buy data step 3
// const buySelectedBundle = new Composer<BotSession>();
// buySelectedBundle.start((ctx)=>{
//   console.log(ctx.scene.session.action,"buying data")
// })
// buySelectedBundle.action(["purchase1","purchase2"],async(ctx)=>{
//   // try{
//   //   const id = findBundleId(ctx.match?.[0])
//   //   if(id !== undefined && id > 0){
//   //     //if this network request goes bad what happens?
//   //     await purchaseData(ctx, id);
//   //     return ctx.scene.leave()
//   //   }
//   // }
//   // catch(err){

//   // }

  
// })