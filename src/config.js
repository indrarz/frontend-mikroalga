export const apiDomain = 'http://117.53.47.76/backend-mikroalga/public/'
//export const apiDomain = 'http://127.0.0.1:8000/'
export const loginUrl = apiDomain + 'api/auth/login'
export const userUrl = apiDomain + 'api/auth/me'
export const usersUrl = apiDomain + 'api/users'
export const produksiUrl = apiDomain + 'api/produksi'
export const kolamUrl = apiDomain + 'api/kolam'
export const mikroalgaUrl = apiDomain + 'api/mikroalga'
export const logaksiUrl = apiDomain + 'api/log-aksi'
export const aksiUrl = apiDomain + 'api/exec'
export const perizinanUrl = apiDomain + 'api/perizinan'
export const refreshUrl = apiDomain + 'api/auth/refresh'

export const getHeader = function(){
    const tokenData = JSON.parse(window.sessionStorage.getItem('authUser'))
    const headers = {
        'Accept': 'application/json',
        'Authorization': 'Bearer' + tokenData.access_token
    }

    return headers
}