import axios from "axios";

const COURSE_API_URL = "https://localhost:8443";

class LoginService {
  login(credential) {
    return axios.post(`${COURSE_API_URL}/login`, credential);  
  }
}

export default new LoginService();