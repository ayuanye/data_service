// 报告对比
import { serviceHandle } from '@/utils/serviceHandle'

export const startV2 = (param) => serviceHandle('post', '/api/p/version/compare/startV2', param)
export const deleteV2 = (param) => serviceHandle('post', '/api/p/version/report/deleteV2', param)
export const reportV2 = (param) => serviceHandle('post', '/api/p/version/reportV2', param)