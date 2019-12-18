import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

axios.defaults.baseURL = "https://localhost:8443";

export const store = new Vuex.Store({
  state: {
    token: localStorage.getItem('token') || null,
    questions:[]
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
    retrieveAdmin(state, questions) {
      state.questions = questions
    },
  },
  actions: {
    destroyToken(context) {
      if(context.getters.loggedIn) {
        localStorage.removeItem('token');
        context.commit('destroyToken')
      }
    },

    retrieveToken(context, credentials) {
      return new Promise((resolve, reject) => {
        axios.post('/login', {
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
    }, 

    retrieveAdminQuestions(context) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token;
      
      axios.get('/api/admin/questions')
      .then(response => {
        context.commit('retrieveAdmin', response.data)
      })
      .catch(error => {
        console.log(error);
      })
    }, 

  }
})