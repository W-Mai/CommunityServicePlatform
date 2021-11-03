const cloud = require('wx-server-sdk')
// 云函数入口文件
cloud.init({
  env:"zzuli-as-open-plt-qfh5y"
})
const db = cloud.database()
const _ = db.command

/*const templateaaa = {
    form_info:{
        user_id: null,
        join_id: null
    },
    form_data: {},
    status: 0,
    msg : "",
    op:"set", "get", "del", "update", "create"
}*/


// 云函数入口函数
exports.main = async (event, context) => {
    // console.log(event)

    let form_info = event.form_info
    let form_data = event.form_data
    let status = event.status
    let msg = event.msg
    let op = event.op
    
    // console.log(form_data, form_info, msg, status, op)
    let search =  db.collection('Application-Form').where(
        {
            join_id : form_info.join_id,
            user_id : form_info.user_id
        }
    )
    
    if(op == "get"){
        return (await search.get()).data[0]
    } else if(op == "set"){
        return await search.set({
            data:{
                form_data : form_data,
                status : status,
                msg : msg
            }
        })
    } else if(op == "del"){
        return await search.remove()
    } else if(op == "update"){
        if(msg.length){
            return await search.update({
                data:{
                    msg : msg,
                    status : status
                }
            })
        }else{
            return await search.update({
                data:{
                    form_data : form_info
                }
            })
        }
    } else if(op == "create"){
        return await db.collection('Application-Form').add(
            {
                data:{
                    join_id : form_info.join_id,
                    user_id : form_info.user_id,
                    form_data : form_data,
                    status : status,
                    msg : msg
                }
            }
        )
    }

//   let user_id = event.user_id
//   let join_id = event.join_id
//   let op_mode = event.op_mode

//   let join_ids = (await db.collection('Application-Form')
//   .where({
//     _id:user_id
//   })
//   .field({
//     join_ids:true
//   })
//   .get()).data
//   console.log(join_ids, )
//   if(join_ids.length == 0){
//     return false
//   }
//   join_ids = join_ids[0].join_ids

//   console.log(join_ids, )

//   if(op_mode == 0){ //0添加， 1删除
//     if(join_ids != null && join_ids.indexOf(join_id) > -1){
//       return false
//     }
//     console.log("add Mode")
//     let res = await db.collection('Stu')
//     .where({
//       _id:user_id
//     })
//     .update({
//       data: {
//         // _openid: res.result.openid,
//         join_ids: _.addToSet(join_id)
//       }
//     }).catch(
//       res => {
//         return false
//       }
//     )
  
//     console.log(res.data)
  
//     await db.collection('ASInformations')
//     .where({
//       _id:join_id
//     })
//     .update({
//       data: {
//         // _openid: res.result.openid,
//         user_list: _.push(user_id)
//       }
//     }).catch(
//       res => {
//         return false
//       }
//     )
//   }else if(op_mode == 1){ //1删除
//     console.log("delete Mode")
//     // let tmpList = join_ids
//     // tmpList.splice(tmpList.indexOf(join_id), 1)

//     let res = await db.collection('Stu')
//     .where({
//       _id:user_id
//     })
//     .update({
//       data: {
//         join_ids: _.pull(join_id)
//       }
//     }).catch(
//       res => {
//         return false
//       }
//     )
  
//     console.log(res.data)
  
//     await db.collection('ASInformations')
//     .where({
//       _id:join_id
//     })
//     .update({
//       data: {
//         // _openid: res.result.openid,
//         user_list: _.pull(user_id)
//       }
//     }).catch(
//       res => {
//         return false
//       }
//     )
//   }

 

//   return true
}