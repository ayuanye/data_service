import Mock, { Random } from 'mockjs'
let data = function () {
  let data = Mock.mock({
    'data|1-40': [{
      'chqk': "重合成功",
      'clqk': "茶前变：10KV九龙112开关跳闸，过流I段，A相，90.12A， 重合成功。",
      'cxsj': function () { return Random.date('yyyy-MM-dd hh:mm:ss') },
      'dydj': function () { return Random.natural(35, 220) + 'kV' },
      'gzlx': "线路故障",
      'gzqk': "茶前变",
      'gzyy': "外力破坏",
      'jgmc': "10kV水厂线116",
      'jdgz': '无故障',
      'objId': "43C15ED9-9662-4CFD-82F5-6092429BCFE5-05823",
      'sftz': "是",
      'sjdl': 231.46,
      'ssdl': function () {
        let num = 0
        let ran = Math.random()
        if ( ran > 0.5 && ran < 0.7) {
          num = 1
        } else if (ran >= 0.7){
          num = ''
        }
        return num
      },
      'ssdw': "宜兴"
    }]
  })
  data.total = data.data.length
  return data
}
export default data