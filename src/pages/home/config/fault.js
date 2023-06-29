export const tripColumns = [
  {
    type: 'index',
    width: 80,
    align: 'center',
    className: 'header-green',
    renderHeader (h) {
      return h('span', {}, '序号')
    }
  }, {
    title: '出现时间',
    key: 'startTime',
    className: 'header-green preline',
    align: 'center'
  }, {
    title: '电压等级',
    key: 'dydj',
    className: 'header-green',
    align: 'center'
  }, {
    title: '故障类型',
    key: 'gzlx',
    className: 'header-green',
    align: 'center'
  }, {
    title: '场所',
    key: 'gzqk',
    className: 'header-green',
    align: 'center'
  }, {
    title: '间隔名称',
    key: 'jgmc',
    className: 'header-green',
    align: 'center'
  }, {
    title: '故障原因',
    key: 'gzyy',
    className: 'header-green',
    align: 'center'
  }, {
    title: '重合情况',
    key: 'chqk',
    className: 'header-green',
    align: 'center'
  }, {
    title: '是否跳闸',
    key: 'sftz',
    className: 'header-green',
    align: 'center'
  }, {
    title: '接地故障',
    key: 'jdgz',
    className: 'header-green',
    align: 'center'
  }, {
    title: '损失电(万千瓦时)',
    key: 'ssdl',
    className: 'header-green',
    width: 150,
    align: 'center'
  }, {
    title: '处理情况',
    key: 'clqk',
    className: 'header-green',
    align: 'center',
    width: '300'
  }
]

export const countColumns = [{
  title: ' ',
  key: 'dydj',
  align: 'center',
  className: 'fault-elect'
}, {
  title: '故障数量',
  key: '故障数量',
  align: 'center',
  className: 'fault-number'
}, {
  title: '故障类型',
  key: 'type',
  align: 'center',
  children: [{
    title: '跳闸数量',
    key: '跳闸数量',
    align: 'center'
  }, {
    title: '重合成功',
    key: '重合成功',
    align: 'center'
  }, {
    title: '重合不成',
    key: '重合不成',
    align: 'center'
  }, {
    title: '接地拉停',
    key: '接地拉停',
    align: 'center',
    className: 'fault-stop'
  }]
}, {
  title: '故障原因',
  key: 'reason',
  align: 'center',
  children: [{
    title: '外力破坏',
    key: '外力破坏',
    align: 'center'
  }, {
    title: '雷击',
    key: '雷击',
    align: 'center'
  }, {
    title: '用户原因',
    key: '用户原因',
    align: 'center'
  }, {
    title: '大风',
    key: '大风',
    align: 'center'
  }, {
    title: '异物',
    key: '异物',
    align: 'center'
  }, {
    title: '设备原因',
    key: '设备原因',
    align: 'center'
  }, {
    title: '鸟害',
    key: '鸟害',
    align: 'center'
  }, {
    title: '原因不明',
    key: '原因不明',
    align: 'center'
  }]
}]

export const detailColumns = [{
  type: 'index',
  width: 80,
  align: 'center',
  className: 'header-green',
  renderHeader (h) {
    return h('span', {}, '序号')
  }
}, {
  title: '出现时间',
  key: 'cxsj',
  className: 'header-green',
  align: 'center'
}, {
  title: '电压等级',
  key: 'dydj',
  className: 'header-green',
  align: 'center'
}, {
  title: '故障类型',
  key: 'gzlx',
  className: 'header-green',
  align: 'center'
}, {
  title: '场所',
  key: 'gzqk',
  className: 'header-green',
  align: 'center'
}, {
  title: '间隔名称',
  key: 'jgmc',
  className: 'header-green',
  align: 'center'
}, {
  title: '故障原因',
  key: 'gzyy',
  className: 'header-green',
  align: 'center'
}, {
  title: '重合情况',
  key: 'chqk',
  className: 'header-green',
  align: 'center'
}, {
  title: '是否跳闸',
  key: 'sftz',
  className: 'header-green',
  align: 'center'
}, {
  title: '接地故障',
  key: 'jdgz',
  className: 'header-green',
  align: 'center'
}, {
  key: 'clqk',
  title: '处理情况',
  className: 'header-green header-center',
  align: 'left',
  width: 400
}]

export const infoColumns = [{
  type: 'index',
  width: 80,
  align: 'center',
  className: 'header-purple',
  renderHeader (h) {
    return h('span', {}, '序号')
  }
}, {
  title: '地区',
  key: '地区',
  align: 'center',
  className: 'header-purple'
}, {
  title: '故障区域',
  key: '故障区域',
  align: 'center',
  className: 'header-purple'
}, {
  title: '故障数量',
  key: '故障数量',
  align: 'center',
  className: 'header-purple'
}, {
  title: '跳闸次数',
  key: '跳闸次数',
  align: 'center',
  className: 'header-purple'
}, {
  title: '重合成功',
  key: '重合成功',
  align: 'center',
  className: 'header-purple'
}, {
  title: '重合不成',
  key: '重合不成',
  align: 'center',
  className: 'header-purple'
}, {
  title: '单相接地',
  key: '单相接地',
  align: 'center',
  className: 'header-purple'
}, {
  title: '雷击',
  key: '雷击',
  align: 'center',
  className: 'header-purple'
}, {
  title: '鸟害',
  key: '鸟害',
  align: 'center',
  className: 'header-purple'
}, {
  title: '外力破坏',
  key: '外力破坏',
  align: 'center',
  className: 'header-purple'
}, {
  title: '设备原因',
  key: '设备原因',
  align: 'center',
  className: 'header-purple'
}, {
  title: '用户原因',
  key: '用户原因',
  align: 'center',
  className: 'header-purple'
}, {
  title: '原因不明',
  key: '原因不明',
  align: 'center',
  className: 'header-purple'
}]
