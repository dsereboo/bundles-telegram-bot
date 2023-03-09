import { MultiplyItems } from "../../utils/Operations";
import { StartContext } from "../global/start";

export default function multiplyCommand (ctx:StartContext){
    let input = ctx.message.text;

    let inputArray = input.split(" ");
  
    if (inputArray.length > 1){
      const nums= inputArray.map((str)=>{return parseInt(str)})
  
      if(nums.includes(NaN)){
          return ctx.reply('Invalid input! 😢 Please try again')
      }
      else{
          const product = nums.reduce(MultiplyItems)
          return ctx.reply(`Result is ${product}`)
      }
    }
    return ctx.reply(`result`);
}

