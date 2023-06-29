import Mock, { Random } from 'mockjs'
let data = function () {
  let data = Mock.mock({
    'data|6-10': [{
      'bdz': '35kv闸口变',
      'routeName': '归径变/10kv.10kv金水线184',
      'ratedElect|200-1000': 200,
      'highestElect|200-1000': 200,
      'highestTime': function () { return Random.date('yyyy-MM-dd hh:mm:ss') },
      'loadRate|1-99': 50,
      'duration|1-99': function () { return Random.natural(10, 200) },
      'routeNature': '专线',
      'remark': ''
    }]
  })
  data.total = data.data.length
  return data
}
export default data