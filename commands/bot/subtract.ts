import { SubtractItems } from "../../utils/Operations";
import { StartContext } from "../globals/start";

export default function subtractCommand (ctx:StartContext){
    let input = ctx.message.text;

    let inputArray = input.split(" ");
  
    if (inputArray.length > 1){
      const params = inputArray.slice(1)
      const nums= params.map((str)=>{return parseInt(str)})
  
      if(nums.includes(NaN)){
          return ctx.reply('Invalid input! 😢 Please try again')
      }
      else{
          const difference = nums.reduce(SubtractItems)
          return ctx.reply(`Result is ${difference}`)
      }
    }
    return ctx.reply(`result`);
}

