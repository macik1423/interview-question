import axios from "axios";

const COURSE_API_URL = "https://localhost:8443";

class QuestionDataService {
    retrieveQuestion(id) {
        return axios.get(`${COURSE_API_URL}/questions/${id}`);
    }
    retrieveAllQuestions() {
        return axios.get(`${COURSE_API_URL}/api/questions`);
    }

    //admin panel
    retrieveAllQuestionsAdmin() {
        return axios.get(`${COURSE_API_URL}/admin/questions`);
    }
    deleteQuestionAdmin(id) {
        return axios.delete(`${COURSE_API_URL}/admin/questions/${id}`);
    }
    updateQuestionAdmin(id, question) {
        return axios.put(`${COURSE_API_URL}/admin/questions/${id}`, question);
    }
    createQuestionAdmin(question) {
        return axios.post(`${COURSE_API_URL}/admin/newQuestion`, question);
    }
    
}

export default new QuestionDataService();

