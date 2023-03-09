import { SubtractItems } from "../../utils/Operations";
import { StartContext } from "../global/start";

export default function subtractCommand (ctx:StartContext){
    let input = ctx.message.text;

    let inputArray = input.split(" ");
  
    if (inputArray.length > 1){
      const nums= inputArray.map((str)=>{return parseInt(str)})
  
      if(nums.includes(NaN)){
          return ctx.reply('Invalid input! 😢 Please try again')
      }
      else{
          const difference = nums.reduce(SubtractItems)
          return ctx.reply(`Result is ${difference}`)
      }
    }
    // return ctx.reply(`result`);
}

