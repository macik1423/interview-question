import axios from "axios";

const COURSE_API_URL = "http://localhost:8080";

class ThemeDataService {
    retrieveAllThemes() {
        return axios.get(`${COURSE_API_URL}/themes`);
    }
}

export default new ThemeDataService();

