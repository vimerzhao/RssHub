// 云函数入口文件
const cloud = require('wx-server-sdk')


cloud.init()
const db = cloud.database({
  env: "rss-hub-test-898ca3"
})
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  console.log("云函数入口")
  console.log(event.id)
  await db.collection('rss_list_v2').where({
    _id: event._id
  }).update({
    // data 传入需要局部更新的数据
    data: {
      view_count: _.inc(1)
    },
    success: function (res) {
      console.log(res.data)
    }
  })
}