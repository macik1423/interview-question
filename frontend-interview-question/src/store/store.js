import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

axios.defaults.baseURL = "https://localhost:8443";

export const store = new Vuex.Store({
  state: {
    token: localStorage.getItem('token') || null,
    questions:[], 
    themes: [],
    users: [],
    fromLoginPage: false,
  },
  getters: {
    loggedIn(state) {
      return state.token !== null;
    },
    questions(state) {
      return state.questions;
    },
    themes(state) {
      return state.themes;
    },
    users(state) {
      return state.users;
    }, 
  },
  mutations: {
    retrieveToken(state, token) {
      state.token = token;
    },
    destroyToken(state) {
      state.token = null;
    },
    retrieveAdmin(state, questions) {
      state.questions = questions;
    },
    retrieveQuestions(state, questions) {
      state.questions = questions;
    }, 
    retrieveThemes(state, themes) {
      state.themes = themes;
    },
    addQuestion(state, question) {
      state.questions.push({
        theme: {
          id: question.theme.id,
          type: question.theme.type
        },
        description: question.description,
        answer: question.answer
      })
    },
    deleteQuestion(state, id) {
      const index = state.questions.findIndex(item => item.id === id);
      state.questions.splice(index, 1);
    },
    retrieveUsers(state, users) {
      state.users = users;
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

    retrieveQuestions(context) {
      axios.get('/api/questions')
      .then(response => {
        context.commit('retrieveQuestions',response.data)
      })
      .catch(error => {
        console.log(error);
      })
    }, 

    retrieveThemes(context) {
      axios.get('/api/theme') 
      .then(response => {
        context.commit('retrieveThemes', response.data)
      })
      .catch(error => {
        console.log(error);
      })
    },

    addQuestion(context, question) {
      axios.post('/api/admin/newQuestion', {
        theme: {
          id: question.theme.id,
          type: question.theme.type
        },
        description: question.description,
        answer: question.answer
      })
      .then(response => {
        context.commit('addQuestion', response.data)
      })
      .catch(error => {
        console.log(error);
      })
    },
    
    deleteQuestion(context, id) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token;
      axios.delete('/api/admin/questions/'+id)
      .then(() => {
        context.commit('deleteQuestion', id)
      })
      .catch(error => {
        console.log(error);
      })
    },

    retrieveUsers(context) {
      axios.get('/api/users')
      .then(response => {
        console.log(response.data);
        context.commit('retrieveUsers',response.data)
      })
      .catch(error => {
        console.log(error);
      })
    }
  }
})