// 项目管理
import { serviceHandle } from '@/utils/serviceHandle'

// 列表
export const listV2 = (param) => serviceHandle('post', '/api/p/app/listV2', param)

// 新建
export const doCreateV2 = (param) => serviceHandle('post', '/api/p/app/doCreateV2', param)

// 下载
export const bobcfc = (param) => serviceHandle('get', '/api/p/app/.bobcfc.key', param)

// 编辑
export const doEditV2 = (param) => serviceHandle('post', '/api/p/app/doEditV2', param)

// 删除 
export const doDeleteV2 = (param) => serviceHandle('post', '/api/p/app/doDeleteV2', param)