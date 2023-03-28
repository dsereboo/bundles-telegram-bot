import { AxiosError } from "axios";
import { BotSession, PinRequest, User } from "../../types/common";
import { getToken, postReq } from "../../utils/NetworkFunctions";
import { findBundleId } from "../../utils/Operations";
import purchaseData from "./purchaseData";

export default async function pinValidation(ctx: BotSession, userPin: number) {
  let token = await getToken()
  if(token !== "error"){
    await postReq<PinRequest,boolean>("/Auth/validatePin", token, {userId:1, pin:userPin})
    .then(async (res) => {
      if (res.data) {
        const id = findBundleId(ctx.scene.session.action);
        //Validate chosen bundle exists exits
        if (id !== undefined && id > 0) { 
          //check user status       
          await purchaseData(ctx, id);
          ctx.scene.leave()
        } else {
          ctx.reply(
            "❗Your data purchase cannot be processed.\n\nKindly try again"
          );
          ctx.scene.reenter();
        }
      } else {
        await ctx.reply("❗Wrong pin.\n\nPlease enter your pin again");
        ctx.wizard.selectStep(3);
      }
    })
    .catch((error) => {
      if (error instanceof AxiosError) {
        if (error.status === 404) {
          ctx.reply("❗User ID or bundle not found.\nKindly retry again.");
        } else {
          ctx.reply("❗Purchase failed. Insufficient Funds.", {
            reply_markup: {
              keyboard: [
                [
                  { text: "🏠 HOME",  },
              ],
              [
                { text: "BUY DATA", },
              ],
              ],
              resize_keyboard:true,
              one_time_keyboard:true,
            },
          });
        }
      }
    });
  }  
}
