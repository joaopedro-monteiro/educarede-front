import axios from "axios";
import { Login } from "../commands/login-command";
import { environment } from "../../../environments/environment";

const instance = axios.create({
  baseURL: environment.apiUrl,
  withCredentials: true,
});

export class LoginService {
  async login(login: Login): Promise<any> {
    const response = await instance
      .post(`/login?useCookies=true`, login)
      .then((res) => {
        console.log(res.data);
        return res.data;
      })
      .catch((error) => {
        console.log(error);
        throw new Error(error);
      });
    return response;
  }
}
