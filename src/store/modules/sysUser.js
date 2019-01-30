import {
    login,
    logout,
    getUserInfo
} from "../../api/sysUser.js"

const sysUser = {
    state: {
        token: sessionStorage.getItem("token"),
        role: "",
    },
    mutations: {
        setToken(state, token) {
            state.token = token;
        },
        setRole(state, role) {
            state.role = role;
        },
    },
    actions: {
        login({
            commit
        }, loginInfo) {
            const username = loginInfo.username.trim();
            const password = loginInfo.password;
            return new Promise((resolve, reject) => {
                login({
                    username,
                    password
                }).then(res => {
                    commit("setToken", res.data.token);
                    sessionStorage.setItem("token", res.data.token);
                    resolve();
                }).catch((error) => {
                    reject(error);
                })
            })
        },
        getUserInfo({
            commit,
            state
        }) {
            return new Promise((resolve, reject) => {
                getUserInfo({
                    token: state.token
                }).then(res => {
                    commit("setRole", res.userInfo.role);
                    resolve();
                }).catch((error) => {
                    reject(error);
                })
            })
        },
        logout({
            commit,
            state
        }) {
            return new Promise((resolve, reject) => {
                logout({
                    token: state.token
                }).then(res => {
                    commit("setRole", "");
                    sessionStorage.clear();
                    resolve();
                }).catch((error) => {
                    reject(error);
                })
            })
        }
    }
}
export default sysUser;