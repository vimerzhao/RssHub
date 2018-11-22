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
        author_id: "learn cloud database",
        author_name: event.author_name,
        content: event.content,
        image_url: event.image_url,
        star_count: 0,
        comment_count: 0,
        watch_count: 3
      }
    })
  } catch (e) {
    console.error(e)
  }
}