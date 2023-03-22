import { Bundles, UserButton, UserKeyboard } from "../types/common";

//keyboard button factory method
export function createKeyboardStructure(items: Array<Bundles>) {
  let keyboard: UserKeyboard = [];

  items.map(({ amount, unit, size, bundlePackageId }) => {
    let shape = {
      text: `${size} ${unit} @ GHs ${amount}`,
      callback_data: `bundleId${bundlePackageId}`,
    };
    let button: UserButton= [];
    button.push(shape);
    keyboard.push(button);
  });

  return keyboard;
}

export function beautifyTransactionRef(id:string){
  const strArray= id.split("")
  strArray.splice(2,0, "-")
  strArray.splice(6,0, "-")
  strArray.splice(11,0, "-")
  strArray.splice(-4,0,"-")
  let result = strArray.join("")
  //Sample response structure: BT-000-0000-87-2023 
  return result
}


export function makeTitle(length:number) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}