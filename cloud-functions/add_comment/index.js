// 云函数入口文件
const cloud = require('wx-server-sdk')


cloud.init()
const db = cloud.database({
  env: "rss-hub-test-898ca3"
})

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    return await db.collection('comment_collection').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        // 发布时小程序传入
        postid: event.postid,//评论对应的post
        openid: event.openid,// 唯一标识
        name: event.name,//评论者名字
        date: new Date(),
        content: event.content//评论内容
      }
    })
  } catch (e) {
    console.error(e)
  }
}