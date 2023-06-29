import Mock, { Random } from 'mockjs'
let data = function () {
  let data = Mock.mock({
    'data|1-40': [{
      'startTime': function () { return Random.date('yyyy-MM-dd hh:mm:ss') },
      'place': '烟山变',
      'condition': '110kv段母线单相接地,A10.3 B10.3 C10.3,告韩平,史诗涛,王毅1:43经过试拉发现10kv鲸龙,123线路接地,告史诗涛,王毅,1:52。'
    }]
  })
  data.total = data.data.length
  return data
}
export default data