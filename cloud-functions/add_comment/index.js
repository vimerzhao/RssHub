// 云函数入口文件
const cloud = require('wx-server-sdk')


cloud.init()
/**
 * 在此处设置数据库环境会导致每个云函数都需要手动设置，不能一次修改，十分麻烦
 * 一种方法是在小程序端传入环境参数，可以把环境集中在小程序的globalData中管理
 */
const db = cloud.database({
  env: "rss-hub-test-898ca3"
})

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    return await db.collection('comment_collection').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        // 存入一条评论
        postid: event.postid,//评论对应的post
        //openid: event.openid,// 唯一标识，不要用自己传的，用sdk产生的
        openid: event.userInfo.openId,
        name: event.name,//评论者名字
        avatarUrl: event.avatarUrl,//评论者头像
        time: new Date(),//评论发生的时间
        content: event.content//评论内容
      }
    })
  } catch (e) {
    console.error(e)
  }
}