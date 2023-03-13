import { Bundles } from "../types/common";

//keyboard button factory method
export function createKeyboardStructure(items: Array<Bundles>) {
  let keyboard: Array<Array<{ text: string; callback_data: string }>> = [];

  items.map(({ amount, unit, size,bundlePackageId }) => {
    //TO-DO: use keyboard markup item type
    let shape = {
      text: `${size} ${unit} @ GHs ${amount}`,
      callback_data: `purchase${bundlePackageId}`,

    };
    //TO-DO: type this array
    let button = [];
    button.push(shape);
    keyboard.push(button);
  });

  return keyboard;
}

