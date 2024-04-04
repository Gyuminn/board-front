// src/vuex/getters.js
export default {
    getAccessToken: state => state.accessToken,
    getErrorState: state => state.errorState,
    getIsAuth: state => state.isAuth,
    loggedIn(state) {
        return !!state.user
    }
}