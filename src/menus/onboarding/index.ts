import { Composer } from "telegraf";
import { message } from "telegraf/filters";
import otpValidation from "../../../actions/bundles/otpValidation";
import requestOtp from "../../../actions/bundles/requestOtp";
import { BotSession, RegisterRequest } from "../../../types/common";
import { getToken, postReq } from "../../../utils/NetworkFunctions";

//get user phone number
export const startOnboarding = new Composer<BotSession>();
startOnboarding.on(message("contact"), async (ctx) => {
  //set phone number and telegram user id to register payload
  ctx.scene.session.registrationDetails = {
    ...ctx.scene.session.registrationDetails,
    phoneNumber: ctx.message?.contact?.phone_number,
    telegramUserId: "123456"
  };
  ctx.reply(
    "Kindly enter a 4-digit pin.\n\nThis pin will be used to confirm all transactions from this bot\n\ne.g 1234"
  );
  return ctx.wizard.next();
});


//let user set pin
export const setPin = new Composer<BotSession>();
setPin.on(message("text"), async (ctx) => {
  let pinInput = ctx.update.message.text;
  let pinNumber = parseInt(pinInput);
  if (Number.isNaN(pinNumber) || pinInput.length !== 4) {
    //go to previous step
    await ctx.reply(
      "❗ Invalid input.\n\n Your pin should be a 4 digit number\ne.g 1234\n\n Enter a pin again"
    );
    ctx.wizard.selectStep(1);
  } else {
    //store pin in request payload
    ctx.scene.session.registrationDetails = {
      ...ctx.scene.session.registrationDetails,
      pin: pinInput,
    };
    ctx.reply("Enter your pin again");
    return ctx.wizard.next();
  }
});

//Confirm pin step
export const comparePin = new Composer<BotSession>();
comparePin.on(message("text"), async (ctx) => {
    let firstpinInput = ctx.scene.session.registrationDetails.pin
    let secondpinInput = ctx.update.message.text;
    let pinNumber = parseInt(secondpinInput);
    //compare pin input with stored pin
    if (!Number.isNaN(pinNumber) && secondpinInput.length === 4 && firstpinInput === secondpinInput ) {
      //go to previous step
      ctx.reply(`Confirm your details shown below\n\nPhone Number\n${ctx.scene.session.registrationDetails.phoneNumber}\n\nPin\n${firstpinInput}`,{
       reply_markup:{
         inline_keyboard:[
            [{text:"Confirm", callback_data:"startRegistration"}]
         ]
       } 
      })
      ctx.wizard.next();
    } else {
      await ctx.reply("❗ Pins do not match");
      ctx.wizard.selectStep(1);
    
    }
  //validate pin confirm step
  //if success take to confirm details step
  //if not send back to step 2
});


//Confirm details and receive otp
export const confirmDetails = new Composer<BotSession>()
confirmDetails.action("startRegistration", async(ctx)=>{

    let token = await getToken()
    console.group(ctx.scene.session.registrationDetails, "details")
    if(token !== "error"){
      await postReq<RegisterRequest,string>("/Auth/registeruser",token, {...ctx.scene.session.registrationDetails})
        .then(async(res)=>{
          //TO-DO: Validate response status
            ctx.answerCbQuery()
             await ctx.reply("✅ You have successfully been registered\nYou will receive an OTP code shortly")
             //make request for otp value
             await requestOtp(ctx)
             ctx.wizard.next()
        })
        .catch((err)=>{
            ctx.answerCbQuery()
            console.log(err)
        })
    }
})

//Validate OTP
export const verifyOtp = new Composer<BotSession>()
verifyOtp.on(message("text"), async(ctx)=>{
  //store otp in session
  ctx.scene.session.otp = {
    ...ctx.scene.session.otp,
     pin: ctx.update.message.text
  };
  //request to validate otp
  await otpValidation(ctx)

  //if sucess return success message and route the user to start menu of bot
  //if failure return to previous step and tell user to enter pin again
  // ctx.reply("OTP validated")
})
