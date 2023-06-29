// 版本列表
import { serviceHandle } from '@/utils/serviceHandle'

export const listV2 = (param) => serviceHandle('post', '/api/p/version/listV2', param)
export const newV2 = (param) => serviceHandle('post', '/api/p/version/newV2', param)

export const doAddV2 = (param) => serviceHandle('post', '/api/p/version/doAddV2', param)
export const deleteV2 = (param) => serviceHandle('post', '/api/p/version/deleteV2', param)

export const doload = (param) => serviceHandle('get', '/api/resource/doload', param)
