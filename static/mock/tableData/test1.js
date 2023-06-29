import Mock, { Random } from 'mockjs'
let data = function () {
  let data = Mock.mock({
    'data|1-40': [{
      'name': function () { return Random.cname() },
      'age|10-50': 10,
      'address|1-15': function () { return Random.county(true) },
      'date': function () { return Random.date('yyyy-MM-dd') }
    }]
  })
  data.total = data.data.length
  return data
}
export default data