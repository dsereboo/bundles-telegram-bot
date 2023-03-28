import Context, { NarrowedContext } from "telegraf/typings/context";
import { Update, Message } from "telegraf/typings/core/types/typegram";
import { SceneContextScene, WizardContextWizard, WizardSessionData } from "telegraf/typings/scenes";

export interface BotSession extends Context {
    scene: SceneContextScene<BotSession, BotWizard>;
    wizard: WizardContextWizard<BotSession>;
    user: UserExistence;
}

export interface BotWizard extends WizardSessionData {
    action:string;
    numbers:Array<number>;
    pinTries:number;
    registrationDetails:RegisterRequest;
    otp:Otp;
    token:string;
    user: UserExistence;
    pinIds:PinId;

}

export interface PinId {
  pinOneId: number;
  pinTwoId:number;
}

export interface BundleRequest{
  bundleId:number;
}

export interface Bundles {
    size:string;
    unit:string;
    amount:number;
    bundlePackageId:number;
}

export interface PinRequest {
  userId:number;
  pin:number;
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
    transactionReference:string;
    purchaseDate:string;
}

export interface RegisterRequest {
  telegramUserId:string;
  phoneNumber: string;
  pin:string;
}

export interface RegisterResponse{
  
}

export interface ExistenceRequest {
  telegramUserId: string;
}
export interface UserExistence {
  existence: boolean;
}

export interface Otp{
  pin:string; 
  otpSid:string;
}

export interface VerificationRequest{
  pin:string; 
  otpSid:string;
  telegramUser:string;
}

export interface ApiUser {
  username:string;
  password:string;
}

export type HelpContext = NarrowedContext<
  Context<Update>,
  {
    message: Update.New & Update.NonChannel & Message.TextMessage;
    update_id: number;
  }
>

export type StartContext = NarrowedContext<
  Context<Update>,
  {
    message: Update.New & Update.NonChannel & Message.TextMessage;
    update_id: number;
  }
>&BotSession

export type UserKeyboard = Array<Array<{ text: string; callback_data: string }>>;
export type UserButton = Array<{ text: string; callback_data: string }>;