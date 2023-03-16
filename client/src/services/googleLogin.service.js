import axios from "axios";

const API_URL = "http://localhost:8080/api/auth";

class GoogleLoginService {
  googleLogin() {
    return axios.get(API_URL + "/google", {
      headers: { Authorization: true },
    });
  }
}
export default new GoogleLoginService();
