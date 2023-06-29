import Mock, { Random } from 'mockjs'
let data = function () {
  let data = Mock.mock({
    'data|1-40': [{
      'closeTime': function () { return '自' + Random.date('yyyy-MM-dd hh:mm:ss') + '\n至' + Random.date('yyyy-MM-dd hh:mm:ss') },
      'closeRange': '宜兴变1#主变(回路测试)',
      'closeNumber|10-3000': 20,
      'permissioner': function () { return Random.cname(true)},
      'riskAna': '宜兴变无运行主变,供电可靠性下降110kv宜城线经宜兴变正母供110kv宜茶线。'
    }]
  })
  data.total = data.data.length
  return data
}
export default data