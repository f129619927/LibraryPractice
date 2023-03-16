import axios from "axios";

const API_URL = "http://localhost:8080/api/auth";

class AuthService {
  login(email, password) {
    return axios.post(API_URL + "/login", { email, password });
  }
  register(username, email, password) {
    console.log("axios post register");
    return axios.post(API_URL + "/register", {
      username,
      email,
      password,
    });
  }
}
export default new AuthService();
