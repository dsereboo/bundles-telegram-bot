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
        `Hello ${ctx.update.message.from.first_name} 😃, PH_124 bot at your service.\n\nI can perform addition, subtraction and multiplication on two numbers.\n\nChoose an operation from the options below: `,
        {

          reply_markup: {
            keyboard: [
              [
                { text: "CALCULATOR",  },
            ],
            [
              { text: "BUY DATA", },
            ],
            ],
            resize_keyboard:true,
            one_time_keyboard:true,
          },
        }
      );
}

