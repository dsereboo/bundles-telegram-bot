import Context, { NarrowedContext, } from "telegraf/typings/context";
import { Update, CallbackQuery } from "telegraf/typings/core/types/typegram";
import { SceneContextScene, WizardContextWizard, WizardSessionData } from "telegraf/typings/scenes";

export interface BotSession extends Context {
    scene: SceneContextScene<BotSession, BotWizard>;
    wizard: WizardContextWizard<BotSession>;
    // session: {action:string, firstNum:string, secondNum:string}
}

export interface BotWizard extends WizardSessionData {
    action:string;
    numbers:Array<number>;
    pinTries:number;
}

export interface Bundles {
    size:string;
    unit:string;
    amount:number;
    bundlePackageId:number;
}

export interface User {
    pin:number
}

export interface PurchaseRequest {
    userId:number;
    bundlePackageId:number;
    purchaseMode:string;
}

export interface PurchaseResponse {
    size:string;
    unit:string;
    purchaseId:number;
    purchaseDate:string;
}



// export interface BotSession extends Context{
//     wizard:WizardContextWizard<BotSession>
// }

// export type BotWizard = BotSession & {
//     // scene: SceneContextScene<BotSession, WizardSessionData>;
//     wizard: WizardContextWizard<BotSession>;
// }

// export interface BotWizard extends BotSession {
//     wizard: WizardContextWizard<BotSession>;
// }



// export interface BotWizard {
//     scene: SceneContextScene<WizardSessionData>; 
//     wizard: WizardContextWizard<BotSession>;
// }