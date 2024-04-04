// src/vuex/actions.js
import {IS_AUTH, ERROR_STATE, ACCESS_TOKEN} from './mutation_types'
import loginAPI from '../service/loginAPI'

let setAccessToken = ({commit}, data) => {
    commit(ACCESS_TOKEN, data)
}

let setErrorState = ({commit}, data) => {
    commit(ERROR_STATE, data)
}

let setIsAuth = ({commit}, data) => {
    commit(IS_AUTH, data)
}

// 백엔드에서 반환한 결과값을 가지고 로그인 성공 실패 여부를 vuex에 넣어준다.
let processResponse = (store, loginResponse) => {
    console.log(loginResponse)
    switch (loginResponse) {
        case 'notFound':
            setErrorState(store, 'Wrong ID or Password')
            setIsAuth(store, false)
            break
        default:
            setAccessToken(store, loginResponse.data.accessToken)
            setErrorState(store, '')
            setIsAuth(store, true)
    }
}

export default {
    async login (store, {user_id, user_pw}) {
        let loginResponse = await loginAPI.doLogin(user_id, user_pw)
        processResponse(store, loginResponse)

        store.state.isLogin = true
        return store.getters.getIsAuth  // 로그인 결과를 리턴한다
    }
}