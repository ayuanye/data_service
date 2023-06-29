import { serviceHandle } from '@/utils/serviceHandle'

// 列表菜单
export const myV2 = (data) => serviceHandle('post', '/api/p/snapshot/myV2',data)
// 流程图
export const V2 = (data) => serviceHandle('post', '/api/p/snapshot/detail/graph/V2',data)
// 堆栈图
export const stackV2 = (data) => serviceHandle('post', '/api/p/snapshot/detail/stack/V2',data)
// 点击列表展示右侧内容接口
export const nodeV2 = (data) => serviceHandle('post', '/api/p/snapshot/nodeV2',data)

// 点击报告
export const mySnapshotsCodeReportV2 = (data) => serviceHandle('post', '/api/p/snapshot/mySnapshotsCodeReportV2',data)
// 保存我的快照
export const doUpdateV2 = (data) => serviceHandle('post', '/api/p/snapshot/doUpdateV2',data)
// 进入我的快照
export const editV2 = (data) => serviceHandle('post', '/api/p/snapshot/editV2',data)
// 删除
export const doDeleteV2 = (data) => serviceHandle('post', '/api/p/snapshot/doDeleteV2',data)
// 关系图
export const dataV2 = (data) => serviceHandle('post', '/api/p/map/code/dataV2',data)
// 共享页标签详情
export const detailV2 = (data) => serviceHandle('post', '/api/p/snapshot/detailV2',data)

