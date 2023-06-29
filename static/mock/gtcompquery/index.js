import Mock, { Random } from 'mockjs'
let data = function () {
  let data = Mock.mock({
    'data|1-40': [{
      'apearTime': function () { return Random.date('yyyy-MM-dd') },
      'electLevel': '110kv',
      'faultType': '线路故障',
      'place': '王家变',
      'intervalName': '110kv家卢8A2',
      'reason': '异物碰线',
      'condition': '重合不成',
      'groundFault': '是',
      'dealCond': '正在处理中'
    }]
  })
  data.total = data.data.length
  return data
}
export default data