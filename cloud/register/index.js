const cloud = require('wx-server-sdk')
// 云函数入口文件
cloud.init({
  env:"zzuli-as-open-plt-qfh5y"
})
const db = cloud.database()
const _ = db.command



// 云函数入口函数
exports.main = async (event, context) => {
  console.log(event)
  let user_id = event.user_id
  let join_id = event.join_id
  let op_mode = event.op_mode


  let join_ids = (await db.collection('Stu')
  .where({
    _id:user_id
  })
  .field({
    join_ids:true
  })
  .get()).data
  console.log(join_ids, )
  if(join_ids.length == 0){
    return false
  }
  join_ids = join_ids[0].join_ids

  console.log(join_ids, )

  if(op_mode == 0){ //0添加， 1删除
    if(join_ids != null && join_ids.indexOf(join_id) > -1){
      return false
    }
    console.log("add Mode")
    let res = await db.collection('Stu')
    .where({
      _id:user_id
    })
    .update({
      data: {
        // _openid: res.result.openid,
        join_ids: _.addToSet(join_id)
      }
    }).catch(
      res => {
        return false
      }
    )
  
    console.log(res.data)
  
    await db.collection('ASInformations')
    .where({
      _id:join_id
    })
    .update({
      data: {
        // _openid: res.result.openid,
        user_list: _.push(user_id)
      }
    }).catch(
      res => {
        return false
      }
    )
  }else if(op_mode == 1){ //1删除
    console.log("delete Mode")
    // let tmpList = join_ids
    // tmpList.splice(tmpList.indexOf(join_id), 1)

    let res = await db.collection('Stu')
    .where({
      _id:user_id
    })
    .update({
      data: {
        join_ids: _.pull(join_id)
      }
    }).catch(
      res => {
        return false
      }
    )
  
    console.log(res.data)
  
    await db.collection('ASInformations')
    .where({
      _id:join_id
    })
    .update({
      data: {
        // _openid: res.result.openid,
        user_list: _.pull(user_id)
      }
    }).catch(
      res => {
        return false
      }
    )
  }

 

  return true
}