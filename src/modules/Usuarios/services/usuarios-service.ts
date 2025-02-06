import axios from "axios";
import { environment } from "../../../environments/environment";
import { Register } from "../commands/register-command";
import { User } from "../../Login/commands/user-command";
import { Role } from "../commands/roles-command";

const instance = axios.create({
  baseURL: environment.apiUrl,
  withCredentials: true,
});

export class UsuariosService {
  async register(register: Register): Promise<void> {
    const response = await instance
      .post(`api/user/add-user`, register)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
        throw new Error(error);
      });
  }

  async update(user: Register): Promise<void> {
    const response = await instance.put(`api/user/update-user`, user);
    return response.data;
  }

  async delete(id: string): Promise<void> {
    const response = await instance.delete(`api/user/delete-user/${id}`);
    return response.data;
  }

  async getAllUsers(): Promise<User[]> {
    const response = await instance.get(`api/user/users`);
    return response.data;
  }

  async getAllRoles(): Promise<Role[]> {
    const response = await instance.get(`cargos`);
    return response.data;
  }
}
