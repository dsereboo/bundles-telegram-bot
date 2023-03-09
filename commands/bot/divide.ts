import { DivideItems } from "../../utils/Operations";
import { StartContext } from "../global/start";

export default function divideCommand (ctx:StartContext){
    let input = ctx.message.text;

    let inputArray = input.split(" ");
  
    if (inputArray.length > 1){
      const nums= inputArray.map((str)=>{return parseInt(str)})
  
      if(nums.includes(NaN)){
          return ctx.reply('Invalid input! 😢 Please try again')
      }
      else{
          const sum = nums.reduce(DivideItems)
          return ctx.reply(`Result is ${sum}`)
      }
    }
    return ctx.reply(`result`);
}