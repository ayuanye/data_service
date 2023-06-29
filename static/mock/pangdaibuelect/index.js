import Mock, { Random } from 'mockjs'
let data = function () {
  let data = Mock.mock({
    'data|5-40': [{
      'date': function () { return Random.date('yyyy-MM-dd HH:mm:ss') },
      'name': '354KV杨家变:10KV机械线',
      'supplyElect|10-1000': 20,
      'startTime': function () { return Random.date('yyyy-MM-dd HH:mm:ss') },
      'endTime': function () { return Random.date('yyyy-MM-dd HH:mm:ss') },
      'reason': '位置原因',
      'dispatcher': function () { return Random.cname() }
    }]
  })
  data.total = data.data.length
  return data
}
export default data