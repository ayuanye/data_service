// 项目管理  标签管理
import { serviceHandle } from '@/utils/serviceHandle'

// 列表
export const labelV2 = (param) => serviceHandle('post', '/api/p/labelV2', param)
export const listV2 = (param) => serviceHandle('post', '/api/p/label/addV2', param)
export const deleteV2 = (param) => serviceHandle('post', '/api/p/label/deleteV2', param)