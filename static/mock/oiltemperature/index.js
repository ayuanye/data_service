import Mock, { Random } from 'mockjs'
let data = function () {
  let data = Mock.mock({
    'data|1-40': [{
      'date': function () { return Random.date('yyyy-MM-dd') },
      'bdz': '万石变',
      'zb|1-5': 2,
      'yw|30-60': 31,
      'fh|10-30': 10
    }]
  })
  data.total = data.data.length
  return data
}
export default data