// src/vuex/mutation.js
import * as types from './mutation_types'

export default {
    [types.ACCESS_TOKEN] (state, accessToken) {
        state.accessToken = accessToken
    },
    [types.ERROR_STATE] (state, errorState) {
        state.errorState = errorState
    },
    [types.IS_AUTH] (state, isAuth) {
        state.isAuth = isAuth
    }
}