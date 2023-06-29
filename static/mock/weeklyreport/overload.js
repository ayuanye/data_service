import Mock, { Random } from 'mockjs'
let data = function () {
  let data = Mock.mock({
    'data|6-10': [{
      'bdz': '35kv闸口变',
      'zbmc': '35kv.2号主变-高',
      'ratedCapacity|10-20': 10,
      'ratedElect|200-1000': 200,
      'highestElect|200-1000': 200,
      'highestTime': function () { return Random.date('yyyy-MM-dd hh:mm:ss') },
      'loadRate|1-99': 50,
      'lastYLRate|1-99': 50,
      'oilTemp|40-60': 40,
      'reloadTime': function () { return Random.natural(10, 200) + '分钟' },
      'remark': ''
    }]
  })
  data.total = data.data.length
  return data
}
export default data