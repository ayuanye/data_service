// 代码覆盖率
import { serviceHandle } from '@/utils/serviceHandle'

export const searchAppTotalV2 = (param) => serviceHandle('post', '/api/p/diffcompare/searchAppTotalV2', param)
export const diffcompare = (param) => serviceHandle('post', '/api/p/diffcompare', param)

export const doGitMsgV2 = (param) => serviceHandle('post', '/api/p/diffcompare/doGitMsgV2', param)
export const getGitMsg = (param) => serviceHandle('post', '/api/p/diffcompare/getGitMsg', param)
export const deleteGitMsg = (param) => serviceHandle('post', '/api/p/diffcompare/deleteGitMsg', param)

export const searchV2 = (param) => serviceHandle('post', '/api/p/diffcompare/searchV2', param)
 
