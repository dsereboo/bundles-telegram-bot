// import { AxiosError } from "axios";
import { BotSession, CheckExistence, ExistenceRequest, StartContext } from "../../types/common";
import { startReply } from "../../utils/BotReplies";
import { getToken, postReq } from "../../utils/NetworkFunctions";

export default async function start (ctx:StartContext ){
  
  let token = await getToken()
  if(token !== "success"){
    // postReq<ExistenceRequest, CheckExistence>("/Auth/checkuser", token, {telegramUserId:ctx.update.message.from.id.toString() } )
    postReq<ExistenceRequest, CheckExistence>("/Auth/checkuser", token, {telegramUserId:"4342222242"} )
    .then(
      (res)=>{
        if(res.data.existence){
         //start user bot flow like normal
         startReply(ctx)
        }
        else{
         //start registration process
         ctx.reply(`Hello 😃,\nYou are not a registered to use this service.\nTo register for this service click the button below.`,
         {
           reply_markup:{
                 keyboard:[
               [{text:"REGISTER", request_contact:true}]
             ],
             resize_keyboard:true,
             one_time_keyboard:true,
           }
         }
         )
        }
      }
    )
    .catch((err)=>{
       console.log(err)
    })
  }
   else{
     ///Throw an error to te user
     console.log("error generating token")
   }
  }
  // console.log(token)
 

  // let token = await getToken()
  // if(token !== "error"){
  //   // checkUserExistence(ctx.update.message.from.id.toString(),token)
  //  checkUserExistence("1234563",token)
  //  .then(
  //    (res)=>{
  //      if(res.data.existence){
  //       //start user bot flow like normal
  //       startReply(ctx)
  //      }
  //      else{
  //       //start registration process
  //       ctx.reply(`Hello 😃,\nYou are not a registered to use this service.\nTo register for this service click the button below.`,
  //       {
  //         reply_markup:{
  //               keyboard:[
  //             [{text:"REGISTER", request_contact:true}]
  //           ],
  //           resize_keyboard:true,
  //           one_time_keyboard:true,
  //         }
  //       }
  //       )
  //      }
  //    }
  //  )
  //  .catch((err)=>{
  //     console.log(err)
  //  })
  // }
  // else{
  //   ///Throw an error to te user
  //   console.log("error generating token")
  // }
 

  // await getToken()
  //   .then(async(res)=>{
  //     if (typeof res.data === "string"){
  //       let token = res.data
       
  //     }
     
  //   })
  // await checkUserExistence(ctx.update.message.from.id.toString(),token)
  // .then(
  //   (res)=>{console.log(res.data,"exists")}
  // )
    // await getToken()
    // .then(async(res)=>{
    //   console.log(res.data,"Res")
    //   let exits = 
    // })
    // const exists = checkUserExistence(ctx.update.message.from.id.toString(),token)
    
    //  console.log(exists, "token")
    // if(typeof token !== "undefined"){
    //   await checkUserExistence(ctx.update.message.from.id.toString(),token).then((res)=>{
    //     console.log(res.data, "exists")
    //   })
    // }
    //   console.log("hy")
    //   const exists = checkUserExistence(ctx.update.message.from.id.toString(),token)
    //   console.log(exists.data)
      // .then((results)=>{
      //         console.log("here")
      //         console.log(results.data, "exists")
      //       })
      // .catch((err)=>{
      //   console.log(err)
      // })
    // }
    // console.log(token, "token")
  //  .then(async(res)=>{
  // if (typeof res.data === "string"){
  //   // console.log(ctx.update.message.from.id,"rs")
  //   // ctx.scene.session.token=res.data
  //     //check if user is registered
  //     let token= res.data
  //     console.log(ctx.update.message.from.id.toString(),"userid")
  //     await checkUserExistence(ctx.update.message.from.id.toString(),token)
  //     .then((results)=>{
  //       console.log("here")
  //       console.log(results.data, "exists")
  //     })
  //     .catch((err)=>{
  //       if(err instanceof AxiosError){
  //        console.log(err.response?.data)
  //     }})
  //if yes map to menus
  //if not map to registration process
  //for registration process first step is to ask user permission to send their number
    
//   }
//   // console.log(res.data,"rs")
// })
// .catch((err)=>{
//   if(err instanceof AxiosError){
//     if(err.response?.data.status === 404 ){
//       console.log("User not found")
//     }
//   }

// })
    // console.log(token)
      // ctx.reply(
      //   `Hello ${ctx.update.message.from.first_name} 😃, PH_124 bot at your service.\n\nI can help you buy data bundles or perform arithmetic on two numbers.\n\nChoose an operation from the options below: `,
      //   {
      //     reply_markup: {
      //       keyboard: [
      //         [
      //           { text: "CALCULATOR",  },
      //       ],
      //       [
      //         { text: "BUY DATA", },
      //       ],
      //       ],
      //       resize_keyboard:true,
      //       one_time_keyboard:true,
      //     },
      //   }
      // );
// }



