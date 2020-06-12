export const apiDomain = 'http://117.53.47.76/backend-mikroalga/public/'
export const loginUrl = apiDomain + 'api/auth/login'
export const userUrl = apiDomain + 'api/auth/me'
export const usersUrl = apiDomain + 'api/users'
export const produksiUrl = apiDomain + 'api/produksi'
export const kolamUrl = apiDomain + 'api/kolam'
export const mikroalgaUrl = apiDomain + 'api/mikroalga'

export const getHeader = function(){
    const tokenData = JSON.parse(window.localStorage.getItem('authUser'))
    const headers = {
        'Accept': 'application/json',
        'Authorization': 'Bearer' + tokenData.access_token
    }

    return headers
}