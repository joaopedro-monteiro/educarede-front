import axios from "axios";
import { IBaseService } from "../../../infrastructure/services/base-service";
import { Produto } from "../entity/produto";
import { environment } from "../../../environments/environment";
import { AlterarEstoqueCommand } from "../commands/adicionar-estoque-command";

const instance = axios.create({
    baseURL: environment.apiUrl,
    withCredentials: true,
  });

export class ProdutoService implements IBaseService<Produto> {
    
    async getAll(): Promise<Produto[]> {        
        const response = await instance.get(`/produtos`);
        return response.data;
    }

    getById(id: string): Promise<Produto> {
        const response = axios.get(`${environment.apiUrl}/produtos/${id}`);
        return response.then(res => res.data)
            .catch(error => {
                throw new Error(error);
            });
    }
    create(entity: Produto): Promise<Produto> {
        const response = axios.post(`${environment.apiUrl}/produtos`, entity);
        return response.then(res => res.data)
            .catch(error => {
                throw new Error(error);
            });
    }
    update(entity: Produto): Promise<Produto> {
        const response = axios.put(`${environment.apiUrl}/produtos`, entity);
        return response.then(res => res.data)
            .catch(error => {
                throw new Error(error);
            });
    }
    delete(id: string): Promise<void> {
        const response = axios.delete(`${environment.apiUrl}/produtos/${id}`);
        return response.then(res => res.data)
            .catch(error => {
                throw new Error(error);
            });
    }   

    alterarEstoque(entity: AlterarEstoqueCommand): Promise<void> {
        const response = axios.put(`${environment.apiUrl}/produtos/alterar-estoque`, entity);
        return response.then(res => res.data)
        .catch(error => {
            throw new Error(error);
        });
    }

    atualizarEstoqueAposEnvio(id: string):Promise<void> {
        const response = axios.put(`${environment.apiUrl}/produtos/atualizar-estoque-apos-envio/${id}`);
        return response.then(res => res.data)
        .catch(error => {
            throw new Error(error);
        });
    }
}