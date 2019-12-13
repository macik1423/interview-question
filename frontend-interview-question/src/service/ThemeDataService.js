import axios from "axios";

const COURSE_API_URL = "https://localhost:8443";

class ThemeDataService {
    retrieveAllThemes() {
        return axios.get(`${COURSE_API_URL}/themes`);
    }
    retrieveAllThemeType() {
        return axios.get(`${COURSE_API_URL}/themeType`);
    }
}

export default new ThemeDataService();

