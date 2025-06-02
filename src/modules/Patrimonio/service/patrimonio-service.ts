import axios from "axios";
import { environment } from "../../../environments/environment";
import { IBaseService } from "../../../infrastructure/services/base-service";
import { Patrimonio } from "../entity/patrimonio-entity";
import { AlterarEstoqueCommand } from "../../Produto/commands/adicionar-estoque-command";

const instance = axios.create({
    baseURL: environment.apiUrl,
    withCredentials: true,
  });

  export class PatrimonioService implements IBaseService<Patrimonio> {
      async getAll(): Promise<Patrimonio[]> {
          const response = await instance.get(`patrimonio`).then((res) => {                
                return res.data;
          })
          .catch((error) => {
            console.log(error);
            throw new Error(error);
          });
          return response;
      }
      async getById(id: string): Promise<Patrimonio> {
            const response = await instance.get(`patrimonio/${id}`).then((res) => {
                    return res.data;
            })
            .catch((error) => {
                console.log(error);
                throw new Error(error);
            });
            return response;
      }
      async create(entity: Patrimonio): Promise<Patrimonio> {
            const response = await instance.post(`patrimonio`, entity).then((res) => {
                    return res.data;
            })
            .catch((error) => {
                console.log(error);
                throw new Error(error);
            });
            return response;
      }
      async update(entity: Patrimonio): Promise<Patrimonio> {
            const response = await instance.put(`patrimonio`, entity).then((res) => {
                    return res.data;
            })
            .catch((error) => {
                console.log(error);
                throw new Error(error);
            });
            return response;
      }
      async delete(id: string): Promise<void> {
            const response = await instance.delete(`patrimonio/${id}`).then((res) => {
                    return res.data;
            })
            .catch((error) => {
                console.log(error);
                throw new Error(error);
            });
            return response;
      }

      async alterarEstoque(entity: AlterarEstoqueCommand): Promise<void> {
        const response = await instance.put(`/patrimonio/alterar-estoque`, entity).then(res => res.data)
        .catch(error => {
            throw new Error(error);
        });        
        return response;
    }
  }