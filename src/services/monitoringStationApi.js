import { serviceHandle } from '@/utils/serviceHandle'

// 初始化列表
export const getNodeByTimeV2 = (param) => serviceHandle('post', '/api/p/monitor/getNodeByTimeV2', param)

// 查看信息
export const getTraceGraphV2 = (param) => serviceHandle('post', '/api/p/monitor/getTraceGraphV2', param)

// 详细信息
export const detailV2 = (param) => serviceHandle('post', '/api/p/monitor/detailV2', param)

// 获取应用下拉数据
export const V2 = (param) => serviceHandle('post', '/api/p/monitor/V2', param)

//我的快照
export const saveV2 = (param) => serviceHandle('post', '/api/p/snapshot/saveV2', param)

// 系统快照列表查询
export const openSystemSnapshotV2 = (param) => serviceHandle('post', '/api/p/monitor/openSystemSnapshotV2', param)

// 保存系统快照
export const doSaveSystemSnapshotV2 = (param) => serviceHandle('post', '/api/p/monitor/doSaveSystemSnapshotV2', param)