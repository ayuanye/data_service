import Mock, { Random } from 'mockjs'
let data = function () {
  let data = Mock.mock({
    'data|2-6': [{
      'company': '无锡变电检修室',
      'closeTime': function () { return Random.date('yyyy-MM-dd') },
      'closeRange': '王家变:220kv副母(闸刀大修)',
      'riskAna': '宜兴变无运行主变,供电可靠性下降,110kv宜城经宜兴变正母供110kv宜茶线',
      'preControl': '调控中心, 输变电中心,配电中心',
      'preMeasures': '1.请调控中心做好事故应急预案,确保宜兴变供电可靠;2.输变电预检中心做好110kv宜城线运维工作;3.请配电中心做好下漳变10kv诸桥线运维工作。'
    }]
  })
  data.total = data.data.length
  return data
}
export default data