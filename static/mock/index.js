import Mock from 'mockjs'
import login from './login/index'
import test from './tableData/test1'
import sideSupplement from './sideSupplement/index'
import overhaulmaintenance from './overhaulmaintenance/index'
import pangdaibuelect from './pangdaibuelect/index'
import oiltemperature from './oiltemperature/index'
import limitCount from './limitcount/index'
import countAnalyse from './countAnalyse'
import compQuery from './compquery'
import gtCompQuery from './gtcompquery'
import opening from './opening'
import powerGrid from './powergrid'
import dailyFault from './dailyReport/fault'
import dailyRisk from './dailyReport/risk'
import electFault from './weeklyreport/electFault'
import deviceOverhaul from './weeklyreport/deviceOverhaul'
import riskWarning from './weeklyreport/riskWarning'
import closePlan from './weeklyreport/closePlan'
import overload from './weeklyreport/overload'
import routeOverload from './weeklyreport/routeOverload'
import wLoad from './weeklyreport/wLoadElect'
import homeLoadCap from './home/loadCap'
import homeWeather from './home/weather'
import homeScale from './home/scale'
import homeFault from './home/fault'
import homeOverhaul from './home/overhaul'
import homeRisk from './home/risk'
import homeOverload from './home/overload'
import faultDetailTable from './home/faultDetailTable'
import loadPowerFaultTz from './fault/loadPowerFaultTz'

const basicSucRes = {
  code: 200,
  msg: '请求成功'
}
const basicFailRes = {
  code: 0,
  msg: '请求出错'
}
Mock.setup({
  timeout: 400
})
Mock.mock('/login', () => Object.assign(basicSucRes, login))
Mock.mock('/test', () => Object.assign(basicSucRes, test()))
Mock.mock('/sideSupplement', () => Object.assign(basicSucRes, sideSupplement()))
Mock.mock('/overhaulmaintenance', () => Object.assign(basicSucRes, overhaulmaintenance()))
Mock.mock('/pangdaibuelect', () => Object.assign(basicSucRes, pangdaibuelect()))
Mock.mock('/oiltemperature', () => Object.assign(basicSucRes, oiltemperature()))
Mock.mock('/limitcount', () => Object.assign(basicSucRes, limitCount()))
Mock.mock('/countanalyse', () => Object.assign(basicSucRes, countAnalyse()))
Mock.mock('/compquery', () => Object.assign(basicSucRes, compQuery()))
Mock.mock('/gtcompquery', () => Object.assign(basicSucRes, gtCompQuery()))
Mock.mock('/opening', () => Object.assign(basicSucRes, opening()))
Mock.mock('/powergrid', () => Object.assign(basicSucRes, powerGrid()))
Mock.mock('/dailyfault', () => Object.assign(basicSucRes, dailyFault()))
Mock.mock('/dailyrisk', () => Object.assign(basicSucRes, dailyRisk()))
Mock.mock('/electfault', () => Object.assign(basicSucRes, electFault()))
Mock.mock('/deviceoverhaul', () => Object.assign(basicSucRes, deviceOverhaul()))
Mock.mock('/riskwarning', () => Object.assign(basicSucRes, riskWarning()))
Mock.mock('/closeplan', () => Object.assign(basicSucRes, closePlan()))
Mock.mock('/overload', () => Object.assign(basicSucRes, overload()))
Mock.mock('/routeoverload', () => Object.assign(basicSucRes, routeOverload()))
Mock.mock('/wload', () => Object.assign(basicSucRes, wLoad()))
Mock.mock('/yxdd/load_power/screen', () => Object.assign(basicSucRes, homeLoadCap))
Mock.mock('/yxdd/weather/screen', () => Object.assign(basicSucRes, homeWeather))
Mock.mock('/yxdd/power_scale/screen', () => Object.assign(basicSucRes, homeScale))
Mock.mock('/yxdd/power_falut/screen', () => Object.assign(basicSucRes, homeFault))
Mock.mock('/yxdd/power_overhaul/screen', () => Object.assign(basicSucRes, homeOverhaul))
Mock.mock('/yxdd/risk_warn/screen', () => Object.assign(basicSucRes, homeRisk))
Mock.mock('/yxdd/overload/screen', () => Object.assign(basicSucRes, homeOverload))
Mock.mock('/yxdd/detail', () => Object.assign(basicSucRes, faultDetailTable()))
Mock.mock('/yxdd/power_falut/loadPowerFaultTz', () => Object.assign(basicSucRes, loadPowerFaultTz()))