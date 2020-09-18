// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  // env 参数说明：
  //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
  //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
  //   如不填则使用默认环境（第一个创建的环境）
  // env: 'my-env-id',
  traceUser: true,
  env: "zzuli-as-open-plt-qfh5y"
})

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  // let a = event.a;
  // let b = event.b;
  // return a+b;
  // let aid = event.aid;
  // let username = event.uid;
  const _ = cloud.command;
  const db = cloud.database();
  db.collection('ASInformations').whrer('a64f68025f5dce7e00e3faf96b25024e').update({
  data: {
     username:_.push('666')
  },
})
  // return {
  //   event,
  //   openid: wxContext.OPENID,
  //   appid: wxContext.APPID,
  //   unionid: wxContext.UNIONID,
  // }
}