// 将路由地址扁平化
export const pathFilter = (routers, parentPath) => {
  let arr = []
  routers.forEach(ele => {
    if (ele.children) {
      arr = arr.concat(pathFilter(ele.children, ele.path))
    }
    if (ele.path !== '') {
      let path = ''
      if (parentPath) {
        path = parentPath + '/'
      }
      path = path + ele.path
      arr.push(path)
    }
  })
  return arr
}

// 将路由地址转化成左侧菜单需要的格式
export const setMenuRoutes = (routers) => {
  let routes = []
  function getMenuRoutes (route) {
    let arr = []
    for (let i = 0; i < route.length; i++) {
      if (route[i].children) {
        let r = route[i]
        r.children = getMenuRoutes(route[i].children)
        arr.push(r)
      } else if (!route[i].meta.hidden) {
        arr.push(route[i])
      }
    }
    return arr
  }
  routes = getMenuRoutes(routers[0].children)
  return routes
}

// 页面全屏
export const fullScreen = () => {
  var element = document.documentElement
  if (element.requestFullscreen) {
    element.requestFullscreen()
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen()
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen()
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen()
  }
}

// 退出页面全屏
export const exitFullScreen = () => {
  if (document.exitFullscreen) {
    document.exitFullscreen()
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen()
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen()
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen()
  }
}

// 获取当前点开的页面的父路由的name,结合iview的menu组件使用
export const setMenuOpenNames = (routes) => {
  let openNames = {}
  let arr = []
  getOpenNames(routes)
  function getOpenNames (rou) {
    for (let i = 0; i < rou.length; i++) {
      if (rou[i].children && rou[i].children.length !== 0) {
        arr.push(rou[i].name)
        getOpenNames(rou[i].children)
        arr.pop()
      } else {
        if (arr.length !== 0) {
          openNames[rou[i].name] = [...arr]
        }
      }
    }
  }
  return openNames
}

// 节流
export function debounce (func, wait, immediate) {
  let timeout
  return function (...args) {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      timeout = null
      if (!immediate) func.apply(this, args)
    }, wait)
    if (immediate && !timeout) func.apply(this, [...args])
  }
}

// 表格文件转json
export const excel2json = (file, XLSX) => {
  let reader = new FileReader()
  reader.readAsBinaryString(file)
  return new Promise((resolve, reject) => {
    reader.onload = function (e) {
      let data = e.target.result
      let workbook = XLSX.read(data, { type: 'binary' })
      let sheetNames = workbook.SheetNames
      let worksheet = workbook.Sheets[sheetNames[0]]
      let json = XLSX.utils.sheet_to_json(worksheet)
      resolve(json)
    }
  })
}

// json文件转表格
export const json2excel = (XLSX, data) => {
  let sheet = XLSX.utils.json_to_sheet(data)
  openDownloadDialog(sheet2Blob(XLSX, sheet), '导出.xlsx')
}

// 表格转Blob
function sheet2Blob (XLSX, sheet, sheetName) {
  sheetName = sheetName || 'sheet1'
  let workbook = {
    SheetNames: [sheetName],
    Sheets: {}
  }
  workbook.Sheets[sheetName] = sheet
  let wopts = {
    bookType: 'xlsx',
    bookSST: false,
    type: 'binary'
  }
  let wbout = XLSX.write(workbook, wopts)
  let blob = new Blob([s2ab(wbout)], {
    type: 'application/octet-stream'
  })
  function s2ab (s) {
    let buf = new ArrayBuffer(s.length)
    let view = new Uint8Array(buf)
    for (let i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xff
    return buf
  }
  return blob
}

// 直接调用下载
export const openDownloadDialog = (url, saveName) => {
  if (typeof url === 'object' && url instanceof Blob) {
    url = URL.createObjectURL(url) //  创建blob地址
  }
  let aLink = document.createElement('a')
  aLink.href = url
  aLink.download = saveName || ''
  let event
  if (window.MouseEvent) event = new MouseEvent('click')
  else {
    event = document.createEvent('MouseEvent')
    event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
  }
  aLink.dispatchEvent(event)
}

// 时间格式化
export const dateFormat = (fmt, date) => {
  let ret
  const opt = {
    'Y+': date.getFullYear().toString(),
    'm+': (date.getMonth() + 1).toString(),
    'd+': date.getDate().toString(),
    'H+': date.getHours().toString(),
    'M+': date.getMinutes().toString(),
    'S+': date.getSeconds().toString()
  }
  for (let k in opt) {
    ret = new RegExp('(' + k + ')').exec(fmt)
    if (ret) {
      fmt = fmt.replace(ret[1], (ret[1].length === 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, '0')))
    };
  };
  return fmt
}
// 获取上个月的当前日期
export const getLastMonth = function (curDate) {
  var Nowdate = new Date(curDate)
  var vYear = Nowdate.getFullYear()
  var vMon = Nowdate.getMonth() + 1
  var vDay = Nowdate.getDate()
  var daysInMonth = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  if (vMon === 1) {
    vYear = Nowdate.getFullYear() - 1
    vMon = 12
  } else {
    vMon = vMon - 1
  }
  if ((vYear % 4 === 0 && vYear % 100 !== 0) || (vYear % 400 === 0)) {
    daysInMonth[2] = 29
  }
  if (daysInMonth[vMon] < vDay) {
    vDay = daysInMonth[vMon]
  }
  if (vDay < 10) {
    vDay = '0' + vDay
  }
  if (vMon < 10) {
    vMon = '0' + vMon
  }
  var date = vYear + '-' + vMon + '-' + vDay
  return date
}
// 获取当前月份上个月的第一天或最后一天
export const getLastMonthDayOne = (curDate, sign) => {
  let year = curDate.getFullYear()
  let month = curDate.getMonth()
  if (month === 0) {
    year = year - 1
    month = 11
  } else {
    month = month - 1
  }
  return sign ? new Date(year, month, 1) : new Date(year, month + 1, 0)
}
// 获取当前月份下个月的第一天或最后一天
export const getNextMonthDayOne = (curDate, sign) => {
  let year = curDate.getFullYear()
  let month = curDate.getMonth()
  if (month === 11) {
    year = year + 1
    month = 0
  } else {
    month = month + 1
  }
  return sign ? new Date(year, month, 1) : new Date(year, month + 1, 0)
}

// 获取下个月的当前日期
export const getNextMonth = (date) => {
  date = dateFormat('YYYY-mm-dd', date)
  var arr = date.split('-')
  var year = arr[0]
  var month = arr[1]
  var day = arr[2]
  // var days = new Date(year, month, 0)
  // days = days.getDate()
  var year2 = year
  var month2 = parseInt(month) + 1
  if (month2 === 13) {
    year2 = parseInt(year2) + 1
    month2 = 1
  }
  var day2 = day
  var days2 = new Date(year2, month2, 0)
  days2 = days2.getDate()
  if (day2 > days2) {
    day2 = days2
  }
  if (month2 < 10) {
    month2 = '0' + month2
  }

  var t2 = year2 + '-' + month2 + '-' + day2
  return t2
}
// 获取当月天数
export const getMonthDays = (year, month) => {
  return new Date(year, month, 0)
}
