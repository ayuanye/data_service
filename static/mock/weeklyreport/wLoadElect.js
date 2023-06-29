import Mock, { Random } from 'mockjs'
let data = function () {
  let data = Mock.mock({
    'data|6-10': [{
      'area': '宜兴',
      'highestLoad|100-1000': 100,
      'lowestLoad|100-1000': 100,
      'dayElect|100-10000': 1000,
      'monthHighLoad|1000-10000': 10000,
      'orders|1-10': 1,
      'percent': function () { return Random.natural(1, 99) + '%' },
      'jajsl': function () { return Random.natural(1, 99) + '%' },
      'ddxcjsl': function () { return Random.natural(1, 99) + '%' },
      'time|1-24': 1,
      'bdz': '宜兴变',
      'name': '10kv长化线132',
      'eddl|100-500': 100,
      'zddl|100-500': 100,
      'zddlsj': function () { return Random.date('yyyy-MM-dd hh:mm:ss') },
      'rate|1-99': 1,
      'cxsj|1-200': 30,
      'edrl|20-200': 20,
      'zgdlsk': function () { return Random.date('yyyy-MM-dd hh:mm:ss') },
      'oilTemp|40-60': 40,
      'closeTime': function () { return Random.date('yyyy-MM-dd hh:mm:ss') },
      'closeRange': '王家变:220kv副母(闸刀大修)',
      'ana': '宜兴变无运行主变,供电可靠性下降,110kv宜城经宜兴变正母供110kv宜茶线'
    }]
  })
  data.total = data.data.length
  return data
}
export default data