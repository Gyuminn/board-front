// src/service/loginAPI.js
import axios from "axios";

const getUserInfo = (userId, userPw) => {
    const reqData = {
        'user_id': userId,
        'user_pw': userPw
    }

    let serverUrl = '//localhost:8081'

    return axios.post(serverUrl + '/generateToken', reqData, {
        headers: {
            'Content-type': 'application/json'
        }
    })
}

export default {
    async doLogin(userId, userPw) {
        try {
            const getUserInfoPromise = getUserInfo(userId, userPw)
            const [userInfoResponse] = await Promise.all([getUserInfoPromise])
            if (userInfoResponse.data.length === 0) {
                return 'notFound'
            } else {
                console.log(userInfoResponse.data);
                localStorage.setItem('accessToken', userInfoResponse.data.accessToken)
                localStorage.setItem('refreshToken', userInfoResponse.data.refreshToken)
                // localStorage.setItem('user_role', userInfoResponse.data.user_role)
                return userInfoResponse
            }
        } catch (err) {
            console.error(err)
        }
    }
}