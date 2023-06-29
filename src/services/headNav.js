import { serviceHandle } from '@/utils/serviceHandle'

export const logout = () => serviceHandle('get', '/api/user/logoutV2')