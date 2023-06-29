const colors = ['#389fff', '#f58e79', '#1bd7d9', '#7d4fef', '#f1a78a', '#5089bc', '#929292', '#e2aa00', '#62993e']
export const barOptions = (title, xAxisData, yAxisName, seriesData, color, xAxisLabelFontSize, yAxisLabelFontSize, labelSize, gridOpt) => {
  let series = []
  xAxisLabelFontSize = xAxisLabelFontSize || 14
  yAxisLabelFontSize = yAxisLabelFontSize || 14
  labelSize = labelSize || 12
  for (let i = 0; i < seriesData.names.length; i++) {
    series.push({
      name: seriesData.names[i],
      type: 'bar',
      data: seriesData.data[i],
      barGap: 0.5,
      barWidth: 20,
      label: {
        show: true,
        fontSize: labelSize,
        color: '#444444',
        position: 'top'
      },
      itemStyle: {
        normal: {
          color: color[i]
          // color: color
        }
      }
    })
  }
  return {
    grid: Object.assign({
      left: '7%',
      top: '12%',
      height: '70%',
      width: '90%'
    }, gridOpt || {}),
    title: {
      text: title,
      x: 'center',
      y: '0'
    },
    legend: {
      right: 15,
      top: 10,
      data: seriesData.names
    },
    tooltip: {},
    xAxis: [
      {
        type: 'category',
        data: xAxisData,
        axisLabel: {
          interval: 0,
          textStyle: {
            color: '#707070',
            fontSize: xAxisLabelFontSize
          }
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: true,
          lineStyle: {
            type: 'dashed',
            color: '#c6d5f8'
          }
        },
        axisLine: {
          lineStyle: {
            color: '#B2CDE9',
            width: 1,
            type: 'dashed'
          }
        }
      }
    ],
    yAxis: [{
      name: yAxisName,
      nameLocation: 'center',
      nameTextStyle: {
        color: '#707070',
        fontWeight: 'bold'
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: '#c6d5f8',
          type: 'dashed'
        }
      },
      splitArea: {
        show: true,
        areaStyle: {
          color: ['#FBFBFB', '#ffffff']
        }
      },
      axisLabel: {
        textStyle: {
          color: '#707070',
          fontSize: yAxisLabelFontSize
        }
      },
      axisTick: {
        show: false
      },
      axisLine: {
        lineStyle: {
          color: '#B2CDE9',
          width: 1,
          type: 'dashed'
        }
      },
      nameGap: 30
    }],
    series: series
  }
}

export const pieOptions = (title, data, radius, center, legend, roseType, color, titleOpt, labelOpt) => {
  let _color = color || colors
  radius = radius || ['20%', '70%']
  center = center || ['25%', '50%']
  roseType = roseType || false
  let seriesData = []
  let legendsNames = data.map(v => v.name)
  for (let i = 0; i < data.length; i++) {
    seriesData.push({
      name: data[i].name,
      value: data[i].value,
      itemStyle: {
        color: _color[i]
      }
    })
  }
  legend = Object.assign({
    orient: 'vertical',
    right: 60,
    top: 'center',
    data: legendsNames
  }, legend || {})
  titleOpt = Object.assign({
    text: title,
    x: 70,
    y: 60,
    textStyle: {
      fontSize: 14,
      fontWight: 100,
      color: '#444444',
      width: 20
    }
  }, titleOpt || {})
  return {
    tooltip: {
      trigger: 'item',
      formatter: '{b} {c} 占 {d}%'
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    title: titleOpt,
    legend: legend,
    series: [
      {
        radius: radius,
        center: center,
        type: 'pie',
        roseType: roseType,
        label: Object.assign({
          normal: {
            show: false,
            formatter: '{b} {d}%',
            textStyle: {
              fontSize: 15
            },
            position: 'outside'
          },
          emphasis: {
            show: false
          }
        }, labelOpt || {}),
        labelLine: {
          normal: {
            show: true,
            length: 5,
            length2: 25
          },
          emphasis: {
            show: true
          }
        },
        data: seriesData
      }
    ]
  }
}

// let nowClientWidth = document.documentElement.clientWidth

export const nowSize = (val, initWidth = 1920) => {
  return val
  // return val * (nowClientWidth / initWidth)
}
