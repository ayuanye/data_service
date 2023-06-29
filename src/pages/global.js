export function setTime(value){
    var date = new Date(value)
    var year = date.getFullYear();
    /* 在日期格式中，月份是从0开始，11结束，因此要加0
     * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
     * */
    var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
    var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
    var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
    var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    // 拼接
    return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
  
  }
  export function setTimePlus(value) {
    if (value !== undefined && value != null && value.includes("T")) {
      return value.split("T")[0] + " " + value.split("T")[1].split(".")[0]
    } else {
      return value
    }
  }

  //计算天数差的函数，通用 
export function dateDiff(sDate1, sDate2) { //sDate1和sDate2是2017-9-25格式 
  var aDate, oDate1, oDate2, iDays
  aDate = sDate1.split("-")
  oDate1 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0]) //转换为9-25-2017格式 
  aDate = sDate2.split("-")
  oDate2 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0])
  iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24) //把相差的毫秒数转换为天数 
  return iDays
}
// 转换树形结构
export function getTop(arry) {
  return arry.filter(item => item.nodeId == item.parentId || item.parentId == null)
}

export function getChild(pArry, arry) {
  pArry.forEach(idt => {
      idt.children = arry.filter(item => idt.nodeId == item.parentId)
      if ((idt.children).length > 0) {
          getChild(idt.children, arry)
      }
  })
  return pArry
}