// 项目管理  成员管理
import { serviceHandle } from '@/utils/serviceHandle'

// 列表
export const listV2 = (param) => serviceHandle('post', '/api/p/member/listV2', param)

// 添加成员
export const addV2 = (param) => serviceHandle('post', '/api/p/member/addV2', param)

// 删除
export const deleteV2 = (param) => serviceHandle('post', '/api/p/member/deleteV2', param)

// 修改
export const updateRoleV2 = (param) => serviceHandle('post', '/api/p/member/updateRoleV2', param)