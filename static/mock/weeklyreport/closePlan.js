import Mock, { Random } from 'mockjs'
let data = function () {
  let data = Mock.mock({
    'data|2-6': [{
      'company': '配电运检中心',
      'construction': '江苏隆旭',
      'place': '110kv文庄变',
      'level': '20kv',
      'interval': '2号电容器129开关及2号电容器组',
      'content': '2号电容器组开关更换',
      'start': function () { return Random.date('MM/dd hh:mm') },
      'end': function () { return Random.date('MM/dd hh:mm') },
      'time': function () { return Random.date('hh:mm') },
      'isClose': '是',
      'methods': '无',
      'preControl': '1.请调控中心关注运方负荷变化;2.请运检部注意和解环操作安全。'
    }]
  })
  data.total = data.data.length
  return data
}
export default data