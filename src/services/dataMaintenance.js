import { serviceHandle } from '@/utils/serviceHandle'
// 旁代补电量维护
export const sideSupplement = (param) => serviceHandle('post', '/sideSupplement', param)
// 电网检修数据维护
export const overhaulmaintenance = (param) => serviceHandle('post', '/overhaulmaintenance', param)
// 旁代补电量统计
export const pangdaibuelect = (param) => serviceHandle('post', '/pangdaibuelect', param)
// 油温
export const oiltemperature = (param) => serviceHandle('post', '/oiltemperature', param)
// 越限情况统计
export const limitCount = (param) => serviceHandle('post', '/limitcount', param)

export const countAnalyse = (param) => serviceHandle('post', '/countanalyse', param)

// 综合查询
export const compQuery = (param) => serviceHandle('post', '/compquery', param)
// 电网跳闸综合查询
export const gtCompQuery = (param) => serviceHandle('post', '/gtcompquery', param)
// 事故分闸
export const opening = (param) => serviceHandle('post', '/opening', param)
// 电网检修
export const powerGrid = (param) => serviceHandle('post', '/powergrid', param)
// 日报昨日电网事故及异常
export const dailyFault = (param) => serviceHandle('post', '/dailyfault', param)
// 今日电网危险源点
export const dailyRisk = (param) => serviceHandle('post', '/dailyrisk', param)
// 电网异常及事故统计详情
export const electFault = (param) => serviceHandle('post', '/electfault', param)
// 本周主网设备检修情况
export const deviceOverhaul = (param) => serviceHandle('post', '/deviceoverhaul', param)
// 下周主网风险预警
export const riskWarning = (param) => serviceHandle('post', '/riskwarning', param)
// 下周宜兴配网停电计划
export const closePlan = (param) => serviceHandle('post', '/closeplan', param)
// 本周110kv及以下统计负荷表
export const overload = (param) => serviceHandle('post', '/overload', param)
// 本周35kv及以下负荷统计
export const routeOverload = (param) => serviceHandle('post', '/routeoverload', param)

export const wload = (param) => serviceHandle('post', '/wload', param)
