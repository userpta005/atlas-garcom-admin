import { boot } from 'quasar/wrappers'
import axios from 'axios'

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)

const axiosCreated = axios.create({
  baseURL: process.env.api,
  headers: {
    'X-Requested-With': 'XMLHttpRequest'
  },
  withCredentials: true
})

const api = async (config) => {
  try {
    const data = await axiosCreated(config)
    return data
  } catch (error) {
    if (error.response) {
      const response = error.response
      if (response.status === 422) {
        const errors = response.data.errors
        const property = Object.keys(errors)[0]
        throw errors[property][0]
      }
      if (response.status === 401) {
        const authStorage = JSON.parse(localStorage.getItem('auth'))
        authStorage.isAuthenticated = false
        authStorage.user = null
        localStorage.clear()
        localStorage.setItem('auth', JSON.stringify(authStorage))
        window.location.href = `${window.location.origin}/login`
        return
      }
      throw response.data.message
    }
    throw error.message
  }
}

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
})

export { api }
