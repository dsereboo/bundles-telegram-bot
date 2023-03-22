import { AxiosError } from "axios";
import { BotSession, BundleRequest, Bundles } from "../../types/common";
import { isBundlesArray } from "../../types/guards";
import { createKeyboardStructure } from "../../utils/Formatting";
import { getToken, postReq } from "../../utils/NetworkFunctions";
import { welcome } from "../../utils/Operations";

export default async function dataOptions(ctx: BotSession) {

  let token = await getToken()
    if(token !== "error"){
       // 1 for 2Moorch data package
      await postReq<BundleRequest, Array<Bundles>>("/Bundles/bundleList", token, {bundleId:1})
      // await getBundlePackages(1,token)
      .then(async (res) => {
      if(isBundlesArray(res.data)){
        if(res.data.length >= 1){
          const results = createKeyboardStructure(res.data);
          await ctx.reply("Select a bundle offer", {
            reply_markup: {
              inline_keyboard: results,
            },
          });
        }
        else{
          await ctx.reply("❗Bundles not found.\nKindly retry again.")
          welcome(ctx)
        }
        }
      })
      .catch((error) => {
        if(error instanceof AxiosError){
          if(error.status === 404)
          {
            ctx.reply("❗Bundles not found.\nKindly retry again.")
          }
          else{
            console.log(error)
            ctx.reply("❗Request failed.\nKindly retry again.")
          }
        }
      });
    }
}