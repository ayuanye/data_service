import Mock, { Random } from 'mockjs'
let data = function () {
  let data = Mock.mock({
    'data|2-5': [{
      'exploreTime': function () { return Random.date('yyyy-MM-dd')},
      'cureTime': function () { return Random.date('yyyy-MM-dd') },
      'bds': '北塘变',
      'allCondition': '35kv塘兰361开关',
      'protect': '过流I段(3500A)',
      'coincidence': '重合成功',
      'forceTrans': '',
      'ana': '48#杆子绝缘子ABC三项受雷击,不影响运行。'
    }]
  })
  data.total = data.data.length
  return data
}
export default data