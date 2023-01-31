import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'
const time_limit = 'time_limit'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function saveTime() {
  Cookies.set(time_limit, Date.now())
}

export function getTimeLimit() {
  return Cookies.get(time_limit)
}

export function getCookies(data) {
  return Cookies.get(data)
}
export function setCookies(cookieName, data) {
  Cookies.set(cookieName, data)
}
