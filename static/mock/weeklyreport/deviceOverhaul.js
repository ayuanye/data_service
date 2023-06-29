import Mock, { Random } from 'mockjs'
let data = function () {
  let data = Mock.mock({
    'data|2-6': [{
      'company': '无锡变电检修室',
      'closeTime': function () { return Random.date('yyyy-MM-dd') },
      'closeRange': '王家变:220kv副母(闸刀大修)',
      'influence': '王家变220kv单母运行,可能引起五级电网事故,110kv家鹅线经王家变正母供110kv王胥I线',
      'complete': '以开工',
      'explain': ''
    }]
  })
  data.total = data.data.length
  return data
}
export default data