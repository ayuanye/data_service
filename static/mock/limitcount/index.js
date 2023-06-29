import Mock, { Random } from 'mockjs'
let data = function () {
  let data = Mock.mock({
    'data|1-40': [{
      'area': function () { return Random.city() },
      'electLevel|100-200': 101,
      'bdz': 'xx变',
      'signal|50-100': 56,
      'limitTime': function () { return Random.date('yyyy-MM-dd') }
    }]
  })
  data.total = data.data.length
  return data
}
export default data