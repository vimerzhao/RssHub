// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database({
  env: "rss-hub-test-898ca3"
})

// 云函数入口函数
exports.main = async (event, context) => {
  return {
    post_list: await db.collection('post_collection').field({
      _id: true,
      author_name: true,
      content: true,
      title: true,
      view_count: true
    }).orderBy('view_count', 'asc').get(),

  }
}