import Mock, { Random } from 'mockjs'
let data = function () {
  let data = Mock.mock({
    'data|1-40': [{
      'area': function () { return Random.city() },
      'bdz': function () { return Random.county() + '变'},
      'electLevel': function () { return Random.natural(20, 220) + 'kv' },
      'name': function () { return Random.natural(20, 220) + 'kv经久线' + Random.natural(20, 110) },
      'rateElect|30-500': 80,
      'realElect|30-500': 200,
      'ygz|0-100': 10,
      'wgz|0-150': 30,
      'szgl|10-300': 151,
      'loadRate': function () { return Random.float(20, 100, 1, 2) + '%' },
      'reloadTime': function () { return Random.natural(10, 1000) + '分钟'}
    }]
  })
  data.total = data.data.length
  return data
}
export default data