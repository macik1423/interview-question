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
    loader: false,
    countQuestions: 0,
    questionsPagination: [],
    totalPagesPagination: 0,
    userQuestion: [],
    questionAnswer: []
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
    countQuestions(state) {
      return state.countQuestions;
    },
    questionsPagination(state) {
      return state.questionsPagination;
    },
    totalPagesPagination(state) {
      return state.totalPagesPagination;
    },
    questionAnswer(state) {
      return state.questionAnswer;
    }
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
    retrieveCountQuestion(state, countQuestions) {
      state.countQuestions = countQuestions;
    },
    retrieveQuestionsPagination(state, questionsPagination) {
      state.questionsPagination = questionsPagination;
    },
    retrieveTotalPagesPagination(state, totalPagesPagination) {
      state.totalPagesPagination = totalPagesPagination;
    },
    retrieveThemes(state, themes) {
      state.themes = themes;
    },
    addQuestion(state, question) {
      //pushuje do state zeby mozna bylo od razu uzyc, reaktywnie, wynik od razu widzimy na stronie, gdy jest jeszcze raz 
      //ladowana state sie zeruje a dane sa wczytywane z bazy
      state.questions.push({
        id: question.id,
        theme: {
          id: question.theme.id,
          type: question.theme.type
        },
        description: question.description,
        answer: question.answer
      })
    },
    addQuestionAnswer(state, question) {
      state.questionAnswer.push(question);
    },
    deleteQuestion(state, id) {
      const index = state.questions.findIndex(item => item.id === id);
      state.questions.splice(index, 1);
    },
    retrieveUsers(state, users) {
      state.users = users;
    }, 
    retrieveUserQuestions(state) {

    },
    LOADER(state, payload) {
      state.loader = payload;
    }
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

    retrieveCountQuestion(context) {
      axios.get('/api/questions/countQuestions')
      .then(response => {
        context.commit('retrieveCountQuestion', response.data) 
      })
      .catch(error => {
        console.log(error);
      })
    },

    retrieveTotalPagesPagination(context) {
      axios.get('/api/questions/pages/getTotalPages')
      .then(response => {
        context.commit('retrieveTotalPagesPagination', response.data)
      })
      .catch(error => {
        console.log(error);
      })
    },

    retrieveQuestionsPagination(context, page) {
      axios.get('/api/questions/pages?page=' + page)
      .then(response => {
        context.commit('retrieveQuestionsPagination', response.data)
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

    addUserQuestions(context, userQuestions) {
      axios.post('/api/userQuestions', userQuestions)
      .then(response => {
        console.log(context, response);
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
        context.commit('retrieveUsers',response.data)
      })
      .catch(error => {
        console.log(error);
      })
    },

    retrieveUserQuestions(context, userId) {
      axios.get('/api/userQuestions/' + userId)
      .then(response => {
        context.commit('retrieveUserQuestions', response.data)
      })
      .catch(error => {
        console.log(error);
      })
    }
  }
})