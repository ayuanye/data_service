import Mock, { Random } from 'mockjs'
let data = function () {
  let data = Mock.mock({
    'data|1-40': [{
      'number|1-100': 20,
      'place': '宜兴变',
      'range': '宜兴变：1#主变（回路修试）',
      'applyComp': '申请单位',
      'content': '1、开关柜电容器保护更换为电抗器保护装置，开关柜加装避雷器；2、配合新增2组电抗器调试、试验;',
      'startTime': function () { return Random.date('yyyy-MM-dd') },
      'endTime': function () { return Random.date('yyyy-MM-dd') },
      'riskAna': '宜兴变无运行主变，供电可靠性下降，110kV宜城线经宜兴变正母供110kV宜茶线'
    }]
  })
  data.total = data.data.length
  return data
}
export default data