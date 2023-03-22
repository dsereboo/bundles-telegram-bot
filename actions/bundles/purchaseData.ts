import { AxiosError } from "axios";
import { BotSession, PurchaseRequest } from "../../types/common";
import { beautifyTransactionRef, makeTitle } from "../../utils/Formatting";
import { getToken, postReq } from "../../utils/NetworkFunctions";
import * as base64 from "base64topdf"
import { Input } from "telegraf";


export default async function purchaseData(ctx: BotSession, id: number) {
  const payload: PurchaseRequest = {
    //TO-DO: user id should be comming from context (authenticated user)
    //Id for Insufficient funds 5, normal 1
    userId: 1,
    bundlePackageId: id,
    purchaseMode: "vfcash",
  };

  let token = await getToken()
  if(token !== "error"){
    await postReq<PurchaseRequest,string>("/Bundles/purchase",token,{...payload})
    // await buyBundlePackage(payload,token)
    .then(async(res) => {
      let title = makeTitle(6)
      base64.base64Decode(res.data, `./transactions/${"bot"+title}.pdf`)
      const file = Input.fromLocalFile(`C:/Users/PCES/Desktop/WorkProjects/PH125/bundle-and-calculator-bot/transactions/${"bot"+title}.pdf`)
      ctx.replyWithDocument(file)
       //cleaup after reply is sent
    })
    .catch((error) => {
      if(error instanceof AxiosError){
        console.log(error.message)
        if(error.status === 404)
        {
          ctx.reply("❗User ID or bundle not found.\nKindly retry again.")
        }
        else{
          ctx.reply("❗Purchase failed.\nKindly retry again.")
        }
      }
    });
  }  
}


 // const item = res.data?.[0];
      //  let reference =beautifyTransactionRef(item?.transactionReference)
      // if(item.transactionReference !== undefined){
      //   reference = beautifyTransactionRef(item.transactionReference)
      // }
      // await ctx.reply(
      //   `✅ ${reference} Confirmed.\nYou have succesfully bought ${item.size}${item.unit} of data on ${item.purchaseDate}.`,
      //   {
      //     reply_markup: {
      //       keyboard: [
      //         [
      //           { text: "🏠 RETURN TO MAIN MENU",  },
      //       ],
      //       [
      //         { text: "BUY DATA", },
      //       ],
      //       ],
      //       resize_keyboard:true,
      //       one_time_keyboard:true,
      //     },
      //   }
      // );