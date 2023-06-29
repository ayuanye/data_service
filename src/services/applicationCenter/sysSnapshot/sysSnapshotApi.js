// 系统快照
import { serviceHandle } from '@/utils/serviceHandle'

export const listV2 = (param) => serviceHandle('post', '/api/p/sys/snapshot/listV2', param)
export const updateV2 = (param) => serviceHandle('post', '/api/p/sys/snapshot/updateV2', param)
export const V2 = (param) => serviceHandle('post', '/api/p/sys/snapshot/detail/V2', param)
export const addDescribeV2 = (param) => serviceHandle('post', '/api/p/sys/snapshot/addDescribeV2', param)
export const delDescribe = (param) => serviceHandle('post', '/api/p/sys/snapshot/delDescribe', param)

// 新增/重命名
export const savedirectoryV2 = (param) => serviceHandle('post', '/api/p/sys/snapshot/savedirectoryV2', param)
// 删除快照
export const doDelete = (param) => serviceHandle('delete', '/api/p/sys/snapshot/doDelete', param)
// 删除目录
export const deletedirectory = (param) => serviceHandle('post', '/api/p/sys/snapshot/deletedirectory', param)

