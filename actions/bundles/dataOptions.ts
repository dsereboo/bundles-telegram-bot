import { BotSession } from "../../types/common";
import { createKeyboardStructure } from "../../utils/Formatting";
import { getBundlePackages } from "../../utils/NetworkFunctions";

export default async function dataOptions(ctx: BotSession) {
  await getBundlePackages(1)
    .then(async (res) => {
      const results = createKeyboardStructure(res.data);
      await ctx.reply("Select a bundle offer", {
        reply_markup: {
          inline_keyboard: results,
        },
      });
    })
    .catch((err) => {
      //TO:DO Assert and handle error
      console.log(err);
    });
}
