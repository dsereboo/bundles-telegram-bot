import { AxiosError } from "axios";
import { BotSession, Otp } from "../../types/common";
import { startReply } from "../../utils/BotReplies";
import { getToken, postReq } from "../../utils/NetworkFunctions";

export default async function otpValidation(ctx:BotSession){
    //get token
    let token = await getToken()
    if( token !== "error"){
        await postReq<Otp,boolean>("/Auth/verifyotp", token, {...ctx.scene.session.otp})
        .then(async(res)=>{
            if(res.status === 200 && res.data){
                //reply OTP verified
                await ctx.reply("✅ OTP validated successfully. You can now access the bot")
                await ctx.scene.leave()
                //route user to start menu
                startReply(ctx)
            }
            else{
                await ctx.reply ("❗ Wrong OTP.\n\nEnter OTP again")
                await ctx.wizard.selectStep(4)
            }
        })
        .catch((err)=>{
            if(err instanceof AxiosError){
                //return error message
                console.log(err.message, "otp validation failed")
                //allow user to try again
            }
        })
    }
}