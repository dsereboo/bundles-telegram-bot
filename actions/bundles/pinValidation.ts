import { BotSession } from "../../types/common";
import { validateUserPin } from "../../utils/NetworkFunctions";
import { findBundleId } from "../../utils/Operations";
import purchaseData from "./purchaseData";

export default async function pinValidation(ctx:BotSession, userPin:number){
    //TO-DO: take user ID from context
    await validateUserPin(1,userPin)
    .then(async(res)=>{
        console.log(res.data,"res")
        if(res.data){
            const id = findBundleId(ctx.scene.session.action)
            if(id !== undefined && id > 0){
                //TO-DO: Make request network resilient.
                await purchaseData(ctx, id);
            }
            //TO-DO: add else clause
            else{
               
                //cancel transaction return to start  
            }
        }
        else{
            await ctx.reply("Wrong pin.\n\nPlease enter your pin again") 
            ctx.wizard.selectStep(3);

        }
        //check arr content value to see if it is empty
        // console.log(res?.data)
        //move to next step
        // return res.data
        // return ctx.wizard.selectStep(3)
    })
    .catch((err)=>{
        //TO:DO Assert and handle error
        console.log(err)
    })
    //network request to validate user
    //return results
}