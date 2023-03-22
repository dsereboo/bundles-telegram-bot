import { AxiosError } from "axios";
import { BotSession, Otp } from "../../types/common";
import { getToken, postReq } from "../../utils/NetworkFunctions";

export default async function  requestOtp (ctx:BotSession){
    let token = await getToken()
    if(token !== "error"){
        await postReq<{},Otp>("/Auth/getOtp", token, {})
        .then((res)=>{
            if(res.status === 200){
              //set otpSid session
              ctx.scene.session.otp = {
                ...ctx.scene.session.otp,
                otpSid: res.data.otpSid
              };
              ctx.reply(`Bundle bot OTP code is ${res.data.pin}\n\nEnter the OTP received\nOTP should be 6 digits`);
            }
        })
        .catch((err)=>{
            if(err instanceof AxiosError){
                ctx.reply("❗OTP could not be received. Please contact support.");
            }
        })
    }
}