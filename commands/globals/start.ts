import { NarrowedContext, Context } from "telegraf";
import {
  Update,
  Message,
} from "telegraf/typings/core/types/typegram";

export type StartContext = NarrowedContext<
  Context<Update>,
  {
    message: Update.New & Update.NonChannel & Message.TextMessage;
    update_id: number;
  }
>;

export default async function start (ctx:StartContext ){
    ctx.reply(
        `Hello ${ctx.update.message.from.first_name} 😃, PH_124 bot at your service.`
      );
      ctx.reply(
        "I can perform addition, subtraction and multiplacation on two numbers.\nChoose an operation: ",
        {
          reply_markup: {
            inline_keyboard: [
                [
                    { text: "Add", callback_data: "Add", },
                ],
                [
                  { text: "Subtract", callback_data:"Subtract"},
                ],
                [
                  { text: "Multiply", callback_data:"Multiply"},
                ],
                [
                  { text: "Divide", callback_data:"Divide"},
                ]
            ],
          },
        }
      );
}

