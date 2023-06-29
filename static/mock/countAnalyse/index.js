import Mock, { Random } from 'mockjs'
let data = function () {
  let data = Mock.mock({
    'data|1-40': [{
      'title': function() { return Random.city() + ',' + Random.county() + '/35kv 1号主变-高'},
      'rating|10-200': 51,
      'overTime': function () { return Random.date('yyyy-MM-dd HH:mm:ss') },
      'highestLoad': function () { return Random.natural(1, 100) + '%' },
      'realValue': function () { return Random.float(1, 100, 1, 2)},
      'duration': function () { return Random.natural(1, 60) + 'min' }
    }]
  })
  data.total = data.data.length
  return data
}
export default data