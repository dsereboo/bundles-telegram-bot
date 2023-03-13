import { BotSession, PurchaseRequest } from "../../types/common";
import { buyBundlePackage } from "../../utils/NetworkFunctions";

export default async function purchaseData(ctx: BotSession, id: number) {
  const sample: PurchaseRequest = {
    //TO-DO: user id should be comming from context (authenticated user)
    //TO-DO: all network requests should be using bearer authentication
    userId: 1,
    bundlePackageId: id,
    purchaseMode: "vfcash",
  };

  await buyBundlePackage(sample)
    .then((res) => {
      const item = res.data?.[0];
      ctx.reply(
        `${item.purchaseId} Confirmed.\nYou have succesfully bought ${item.size}${item.unit} of data on ${item.purchaseDate}.`
      );
    })
    .catch((err) => {
      //TO-DO: assert it is an error
      //TO-D0: return a reply to user about transaction failure
      console.log(err);
    });
}
