import axios from "axios";

const COURSE_API_URL = "http://localhost:8080";

class ThemeDataService {
    retrieveAllThemes() {
        return axios.get(`${COURSE_API_URL}/themes`);
    }
    retrieveAllThemeType() {
        return axios.get(`${COURSE_API_URL}/themeType`);
    }
}

export default new ThemeDataService();

