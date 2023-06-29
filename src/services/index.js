import { serviceHandle } from '@/utils/serviceHandle'
// 获取系统运行时间
export const getRuntimeDays = (param) => serviceHandle('post', '/yxdd/screen/total_day', param)
// 获取首页负荷电量数据
export const getLoadCapData = (param) => serviceHandle('post', '/yxdd/load_power/screen', param)
// 获取首页天气信息
export const getWeather = (param) => serviceHandle('post', '/yxdd/weather/screen', param)
// 获取首页电网规模信息
export const getScale = (param) => serviceHandle('post', '/yxdd/power_scale/screen', param)
// 获取电网事故数据
export const getFault = (param) => serviceHandle('post', '/yxdd/power_falut/screen', param)
// 获取电网检修
export const getPowerOverhaul = (param) => serviceHandle('post', '/yxdd/power_overhaul/screen', param)
// 获取危险预警
export const getRisk = (param) => serviceHandle('post', '/yxdd/risk_warn/screen', param)
// 获取超重载数据
export const getOverload = (param) => serviceHandle('post', '/yxdd/overload/screen', param)
// 获取故障明细数据
export const getDetailList = (param) => serviceHandle('post', '/yxdd/power_falut/loadPowerFault', param)
// 获取故障统计列表数据
export const getFaultCountList = (param) => serviceHandle('post', '/yxdd/power_falut/powerFaultAnalyse', param)
// 获取故障统计二级页面统计数据
export const getFaultCountInfoData = (param) => serviceHandle('post', '/yxdd/power_falut/secondaryPageAnalyse', param)
// 获取故障统计二级页面弹窗数据
export const getFaultCountInfoModalData = (param) => serviceHandle('post', '/yxdd/power_falut/loadSecondaryPageDetail', param)
// 获取事故跳闸表格数据
export const getFaultTripList = (param) => serviceHandle('post', '/yxdd/power_falut/loadPowerFaultTz', param)
// 获取事故跳闸下面详情数据
export const getFaultTripDetail = (param) => serviceHandle('post', '/yxdd/power_falut/getEarlyWarningDetail', param)
