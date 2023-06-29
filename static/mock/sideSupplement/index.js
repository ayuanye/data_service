import Mock, { Random } from 'mockjs'
let data = function () {
  let data = Mock.mock({
    'data|1-40': [{
      'name': '35KV杨家变,10KV机械线',
      'elect|10-50': 10,
      'startTime': function () { return Random.date('yyyy-MM-dd HH:mm:ss') },
      'endTime': function () { return Random.date('yyyy-MM-dd HH:mm:ss') },
      'address|1-15': function () { return Random.county(true) },
      'date': function () { return Random.date('yyyy-MM-dd') },
      'reason': '旁代路',
      'dispatcher': function () { return Random.cname() }
    }]
  })
  data.total = data.data.length
  return data
}
export default data