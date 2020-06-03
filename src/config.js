export const apiDomain = 'http://127.0.0.1:8000/'
export const loginUrl = apiDomain + 'api/auth/login'
export const userUrl = apiDomain + 'api/auth/me'

export const getHeader = function(){
    const tokenData = JSON.parse(window.localStorage.getItem('authUser'))
    const headers = {
        'Accept': 'application/json',
        'Authorization': 'Bearer' + tokenData.access_token
    }

    return headers
}