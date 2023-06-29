import Mock, { Random } from 'mockjs'
let data = function () {
  let data = Mock.mock({
    'data|1-40': [{
      'closeElectTime': function () {
        let start = Random.date('yyyy-MM-dd HH:mm:ss')
        let end = Random.date('yyyy-MM-dd HH:mm:ss')
        return `自${start}\n至${end}`
      },
      'closeElectRange|1-3': '110kV荷塘变：10kV新芳线411开关至413开关至414开关之间线路',
      'number|2-100': 15,
      'permissionGuy': function () { return Random.cname() },
      'riskAnalizy|1-3': '新芳线由荷塘变10kV城典线、都杨线转供'
    }]
  })
  data.total = data.data.length
  return data
}
export default data