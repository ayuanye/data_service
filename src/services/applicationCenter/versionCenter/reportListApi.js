// 报告列表
import { serviceHandle } from '@/utils/serviceHandle'

export const listV2 = (param) => serviceHandle('post', '/api/p/version/report/listV2', param)
export const deleteV2 = (param) => serviceHandle('post', '/api/p/version/report/deleteV2', param)
export const reportV2 = (param) => serviceHandle('post', '/api/p/version/reportV2', param)