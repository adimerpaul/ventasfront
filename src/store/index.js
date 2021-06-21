import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";
// import example from './module-example'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default new Vuex.Store({
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    user : {},
    // sale : {},
    products:[],
    menudosificacion:false,
  },
  mutations: {
    auth_request(state){
      state.status = 'loading'
    },
    auth_success(state, dat){
      // console.log(dat.user);
      // console.log(dat.user.usuariopermisos.find( permiso => permiso.permiso_id === 2));
      state.status = 'success'
      state.token = dat.token
      state.user = dat.user
      state.menudosificacion=dat.user.usuariopermisos.find( permiso => permiso.permiso_id === 1)!=undefined;
    },
    auth_error(state){
      state.status = 'error'
    },
    logout(state){
      state.status = ''
      state.token = ''
      state.user = {}
    },
  },
  actions: {
    login({commit}, user){
      return new Promise((resolve, reject) => {
        // console.log(process.env.URL+'/login');
        // return false;
        commit('auth_request')
        let url=process.env.URL+'/login';
        // console.log(url);
        // return false;
        axios({url, data: user, method: 'POST' })
          .then(resp => {
            const token = resp.data.token
            const user = resp.data.user[0]
            // console.log(user)
            localStorage.setItem('token', token)
            axios.defaults.headers.common['Authorization'] = 'Bearer '+token
            // console.log(user.name);
            commit('auth_success', {token,user})
            resolve(resp)
          })
          .catch(err => {
            commit('auth_error')
            localStorage.removeItem('token')
            reject(err)
          })
      })
    },
    logout({commit}){
      return new Promise((resolve, reject) => {
        commit('logout')
        localStorage.removeItem('token')
        delete axios.defaults.headers.common['Authorization'];
        resolve()
      })
    }
  },
  getters : {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
  }
})
