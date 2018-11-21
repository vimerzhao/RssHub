// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database({
  env: "rss-hub-test-898ca3"
})

// 云函数入口函数
exports.main = async (event, context) => {
  return {
    rss_list: await db.collection('rss_list_v2').get(),
  
  }
}