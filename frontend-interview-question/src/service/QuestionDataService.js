import axios from "axios";

const COURSE_API_URL = "http://localhost:8080";

class QuestionDataService {
    retrieveQuestion(id) {
        return axios.get(`${COURSE_API_URL}/questions/${id}`);
    }
    retrieveAllQuestions() {
        return axios.get(`${COURSE_API_URL}/questions`);
    }

    //admin panel
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

