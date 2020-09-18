// pages/help/help.js
Page({

  data: {
    textList: [{
        description: "这个页面很多东西我理工男不会写，找个文笔好的谢谢",
      title: "一、郑轻社团小程序介绍",
      id:0
      },

      {
        description: "找个文笔好的谢谢",
      title: "二、功能概要",
      id:1
      },

      {
        description: "找个文笔好的并且会图片排版的因为我觉得这里需要图片文字一起说明好一些谢谢",
      title: "三、快速入门小程序",
      id:2
      },

      {
        description: '浩子给了个模板： \n Q：我点击了报名社团，却找不到报名在哪了？是怎么回事？\nA：点击报名后，能在审核页面看到你报名的社团，同时可以看到状态为未报名。需要你继续填写详细信息，点击报名，才算报名完成。',
      title: "四、常见问题",
      id:3
      },
    
      {
        description: "如有使用问题，请联系：\n QQ号：1341398182 \n 电子邮件：1341398182@qq.com\n温馨提醒：为了更好更快的帮您解决问题，请在邮件中留下电话，学号和姓名。同时留下详细问题描述，或相关截图等信息。",
      title:"五、联系我们",
      id:3
      },
      
    ]
  },

//原本没有upStatus这个字段，所以默认值为false
  upDown(event) {
    var index = event.currentTarget.dataset['index'];
    this.data.textList[index].upStatus = !this.data.textList[index].upStatus;
    this.setData({
      textList: this.data.textList
    })
  },

})