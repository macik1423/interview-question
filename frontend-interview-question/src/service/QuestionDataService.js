import axios from "axios";

const COURSE_API_URL = "http://localhost:8080";

class QuestionDataService {
    retrieveAllQuestions() {
        return axios.get(`${COURSE_API_URL}/questions`);
    }
    deleteQuestion(id) {
        return axios.delete(`${COURSE_API_URL}/questions/${id}`);
    }
    retrieveQuestion(id) {
        return axios.get(`${COURSE_API_URL}/questions/${id}`);
    }
    updateQuestion(id, question) {
        return axios.put(`${COURSE_API_URL}/questions/${id}`, question);
    }
    createQuestion(question) {
        return axios.post(`${COURSE_API_URL}/newQuestion`, question);
    }
}

export default new QuestionDataService();

