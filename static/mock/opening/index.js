import Mock, { Random } from 'mockjs'
let data = function () {
  let data = Mock.mock({
    'data|1-40': [{
      'actionTime': function () { return Random.date('yyyy-MM-dd') },
      'area': '宜兴',
      'factoryStation': '厂站',
      'electLevel': '220kv',
      'deviceName': '设备名称',
      'switchName': '开关名称',
      'reclosing': '成功',
      'yx': '查看详情',
      'actionCond': '无动作'
    }]
  })
  data.total = data.data.length
  return data
}
export default data