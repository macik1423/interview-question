import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

axios.defaults.baseURL = "https://localhost:8443/";

export const store = new Vuex.Store({
  state: {
    token: localStorage.getItem('token') || null,
  },
  getters: {
    loggedIn(state) {
      return state.token !== null
    }
  },
  mutations: {
    retrieveToken(state, token) {
      state.token = token
    },
    destroyToken(state) {
      state.token = null
    },
  },
  actions: {
    destroyToken(context) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token;
      
      if(context.getters.loggedIn) {
        return new Promise((resolve, reject) => {
          axios.post("logout")
          .then(response => {
            localStorage.removeItem('token');
            context.commit('destroyToken')
            resolve(response);
          })
          .catch(error => {
            localStorage.removeItem('token');
            context.commit('destroyToken');
            reject(error);
          })
        })
      }
    },
    retrieveToken(context, credentials) {
      console.log(credentials);
      return new Promise((resolve, reject) => {
        axios.post('login', {
          login: credentials.login,
          password: credentials.password
        })
        .then(response => {
          const token = response.headers.authorization;
          localStorage.setItem('token', token);
          context.commit('retrieveToken', token);
          resolve(response);
        })
        .catch(error => {
          console.log(error);
          reject(error);
        })
      })
    }
    
  }
})