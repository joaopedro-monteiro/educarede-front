import axios from "axios";
import { IBaseService } from "../../../infrastructure/services/base-service";
import { environment } from "../../../environments/environment";
import { UnidadeDeEnvio } from "../entity/unidade-de-envio";

export class UnidadeDeEnvioService implements IBaseService<UnidadeDeEnvio> {
    async getAll(): Promise<UnidadeDeEnvio[]> {
        const response = await axios.get(`${environment.apiUrl}/unidades-de-envio`);
        return response.data; 
    }

    getById(id: string): Promise<UnidadeDeEnvio> {
        const response = axios.get(`${environment.apiUrl}/unidades-de-envio/${id}`);
        return response.then(res => res.data)
        .catch(error => {
            throw new Error(error);
        });    
    }
    create(entity: UnidadeDeEnvio): Promise<UnidadeDeEnvio> {
        const response = axios.post(`${environment.apiUrl}/unidades-de-envio`, entity);
        return response.then(res => res.data)
        .catch(error => {
            throw new Error(error);
        });
    }
    update(entity: UnidadeDeEnvio): Promise<UnidadeDeEnvio> {
        const response = axios.put(`${environment.apiUrl}/unidades-de-envio`, entity);
        return response.then(res => res.data)
        .catch(error => {
            throw new Error(error);
        });
    }
    delete(id: string): Promise<void> {
        const response = axios.delete(`${environment.apiUrl}/unidades-de-envio/${id}`);
        return response.then(res => res.data)
        .catch(error => {
            throw new Error(error);
        });
    }

}