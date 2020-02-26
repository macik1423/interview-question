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
    questionAnswer: [], 
    userQuestions: [], 
    randomQuestionPagination: {}
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
    },
    userQuestions(state) {
      return state.userQuestions;
    }, 
    randomQuestionPagination(state) {
      return state.randomQuestionPagination;
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
    retrieveRandomQuestionPagination(state) {
      state.randomQuestionPagination = state.questionsPagination[Math.floor(Math.random() * state.questionsPagination.length)]
    },
    retrieveThemes(state, themes) {
      state.themes = themes;
    },
    spliceQuestionPagination(state, question) {
      state.questionsPagination.splice(state.questionsPagination.indexOf(question),1);
      state.randomQuestionPagination = {}
    },
    addQuestion(state, question) {
      //pushuje do state zeby mozna bylo od razu uzyc, reaktywnie, wynik od razu widzimy na stronie, gdy jest jeszcze raz 
      //ladowana state sie zeruje a dane sa wczytywane z bazy
      state.questions.push(question);
    },
    addQuestionAnswer(state, questionAnswer) {
      state.questionAnswer.push(questionAnswer);
    },
    deleteQuestion(state, id) {
      const index = state.questions.findIndex(item => item.id === id);
      state.questions.splice(index, 1);
    },
    retrieveUsers(state, users) {
      state.users = users;
    }, 
    retrieveUserQuestions(state, userQuestions) {
      // retrieve user question from db and updated with questionAnswer
      state.userQuestions = userQuestions;
      state.questionAnswer.forEach(element => {
        let index = userQuestions.findIndex(
          item => {            
            return item.id.userId === parseInt(element.id.userId) && item.id.questionId === element.id.questionId
          }
        )
        if(index === -1) {
          state.userQuestions.push(element);
        } else {
          state.userQuestions[index].know = element.know;
        }
      });
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
        context.commit('retrieveQuestionsPagination', response.data);
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
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token;
      axios.post('/api/admin/newQuestion', question)
      .then(response => {
        context.commit('addQuestion', response.data)
      })
      .catch(error => {
        console.log(error);
      })
    },

    addUserQuestions(context, questionAnswer) {
      axios.post('/api/userQuestions', questionAnswer)
      .then(response => {
        console.log(context,response.data);
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
      axios.get('/api/userQuestions/user/' + userId)
      .then(response => {
        context.commit('retrieveUserQuestions', response.data)
      })
      .catch(error => {
        console.log(error);
      })
    }, 

    
  }
})