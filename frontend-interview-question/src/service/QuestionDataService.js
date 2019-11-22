import axios from "axios";

const COURSE_API_URL = "http://localhost:8080";

class QuestionDataService {
    retrieveAllQuestions() {
        return axios.get(`${COURSE_API_URL}/questions`);
    }
    deleteQuestion(id) {
        return axios.delete(`${COURSE_API_URL}/questions/${id}`);
    }
}

export default new QuestionDataService();

