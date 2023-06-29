import { serviceHandle } from '@/utils/serviceHandle'

export const login = (param) => serviceHandle('post', '/api/doLoginV2', param)
export const register = (param) => serviceHandle('post', '/api/doRegisterV2', param)

export const test = (param) => serviceHandle('post', '/test', param)
