import Mock, { Random } from 'mockjs'
let data = function () {
  let data = Mock.mock({
    'data|1-40': [{
      'showTime': function () { return Random.date('yyyy-MM-dd') },
      'electLevel': function () { return Random.natural(35, 220) + 'kV'},
      'type': '其他',
      'place': '美栖变',
      'name': '35kV恒来368开关',
      'reason': '用户原因',
      'situation': '重合成功',
      'isTrip': '否',
      'groundFault': '否',
      'handle': '35kV恒来365开关跳闸,重合成功,告毛东明,孙天宏.22:00孙天宏故障为10kV出线柜避雷器爆炸,一相引线搭在母线、BC相上引起跳闸,改出线柜跳闸同时引起美栖变跳闸'
    }]
  })
  data.total = data.data.length
  return data
}
export default data