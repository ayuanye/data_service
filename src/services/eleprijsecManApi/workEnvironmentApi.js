// 项目管理  工作环境
import { serviceHandle } from '@/utils/serviceHandle'

// 列表
export const list = (param) => serviceHandle('post', '/api/p/env/list', param)

// 添加成员
export const create = (param) => serviceHandle('post', '/api/p/env/create', param)

// 删除
export const deletes = (param) => serviceHandle('post', '/api/p/env/delete', param)

// 修改
export const update = (param) => serviceHandle('post', '/api/p/env/update', param)

// 全量查询
export const getAll = (param) => serviceHandle('post', '/api/p/env/getAll', param)