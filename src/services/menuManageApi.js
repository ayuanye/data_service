import { serviceHandle } from '@/utils/serviceHandle'

// 新建项目
export const doCreateV2 = (param) => serviceHandle('post', '/api/project/doCreateV2', param)

// 列表查询
export const myProjectsV2 = (param) => serviceHandle('post', '/api/myProjectsV2', param)

// 删除
export const doDeleteV2 = (param) => serviceHandle('post', '/api/p/doDeleteV2', param)
// 修改
export const doEditV2 = (param) => serviceHandle('post', '/api/p/doEditV2', param)
