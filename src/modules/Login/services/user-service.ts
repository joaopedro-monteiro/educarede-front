import axios from "axios";
import { environment } from "../../../environments/environment";
import { User } from "../commands/user-command";

const instance = axios.create({
  baseURL: environment.apiUrl,
  withCredentials: true,
});

export class UserService {
  async user(): Promise<User> {
    const response = await instance
      .get(`api/user`)
      .then((res) => {
        console.log(res.data);
        return res.data;
      })
      .catch((error) => {
        throw new Error(error);
      });
    return response;
  }

  async logout(): Promise<void> {
    const response = await axios.post(environment.apiUrl + "/api/user/logout")
    .then((res) => {
      console.log("Logout realizado com sucesso");
    })
    .catch((error) => {
      throw new Error(error);
    });
  }
}
