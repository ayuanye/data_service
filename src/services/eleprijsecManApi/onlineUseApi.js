// 项目管理  在线应用
import { serviceHandle } from '@/utils/serviceHandle'

// 列表
export const onlineV2 = (param) => serviceHandle('post', '/api/p/app/onlineV2', param)
