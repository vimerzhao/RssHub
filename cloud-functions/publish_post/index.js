// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database({
  env: "rss-hub-test-898ca3"
})
// 云函数入口函数
exports.main = async (event, context) => {
  try {
    return await db.collection('post_collection').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        // 发布时小程序传入
        //author_id: event.openid,不要自己传，用sdk自带的
        author_id: event.userInfo.openId,
        author_name: event.author_name,
        author_avatar_url: event.author_avatar_url,
        content: event.content,
        image_url: event.image_url,
        // 服务器时间和本地时间会造成什么影响，需要评估
        publish_time: Date.now(),
        // update_time: event.update_time,// 最近一次更新时间，发布或者评论触发更新,目前用服务器端时间
        update_time: Date.now(),
        // 默认值，一些目前还没开发，所以没设置
        // comment_count: 0,//评论数，直接读数据库，避免两个数据表示同一含义
        watch_count: 1,//浏览数
        // star_count: 0,//TODO：收藏人数
      }
    })
  } catch (e) {
    console.error(e)
  }
}