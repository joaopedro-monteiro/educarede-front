import axios from "axios";
import { IBaseService } from "../../../infrastructure/services/base-service";
import { Fornecedor } from "../entity/fornecedor";
import { environment } from "../../../environments/environment";

export class FornecedorService implements IBaseService<Fornecedor> {
    async getAll(): Promise<Fornecedor[]> {
        const response = await axios.get(`${environment.apiUrl}/fornecedores`);    
        return response.data; 
    }

    getById(id: string): Promise<Fornecedor> {
        const response = axios.get(`${environment.apiUrl}/fornecedores/${id}`);
        return response.then(res => res.data)
        .catch(error => {
            throw new Error(error);
        });    
    }
    create(entity: Fornecedor): Promise<Fornecedor> {
        const response = axios.post(`${environment.apiUrl}/fornecedores`, entity);
        console.log(response);
        return response.then(res => res.data)
        .catch(error => {
            throw new Error(error);
        });
    }
    update(entity: Fornecedor): Promise<Fornecedor> {
        const response = axios.put(`${environment.apiUrl}/fornecedores/${entity.id}`, entity);
        return response.then(res => res.data)
        .catch(error => {
            throw new Error(error);
        });
    }
    delete(id: string): Promise<void> {
        const response = axios.delete(`${environment.apiUrl}/fornecedores/${id}`);
        return response.then(res => res.data)
        .catch(error => {
            throw new Error(error);
        });
    }

}