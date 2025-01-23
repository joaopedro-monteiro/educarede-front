import axios from "axios";
import { IBaseService } from "../../../infrastructure/services/base-service";
import { GuiaDeRemessaItem } from "../entity/guia-de-remessa-item";
import { environment } from "../../../environments/environment";

export class GuiaDeRemessaItemService implements IBaseService<GuiaDeRemessaItem> {
    async getAll(): Promise<GuiaDeRemessaItem[]> {
        const response = await axios.get(`${environment.apiUrl}/guia-de-remessa-itens`);
        return response.data;
    }
    async getById(id: string): Promise<GuiaDeRemessaItem> {
        const response = axios.get(`${environment.apiUrl}/guia-de-remessa-itens/${id}`);
        return response.then(res => res.data)
            .catch(error => {
                throw new Error(error);
            });
    }
    async create(entity: GuiaDeRemessaItem): Promise<GuiaDeRemessaItem> {
        const response = axios.post(`${environment.apiUrl}/guia-de-remessa-itens`, entity);
        return response.then(res => res.data)
            .catch(error => {
                throw new Error(error);
            });
    }
    async update(entity: GuiaDeRemessaItem): Promise<GuiaDeRemessaItem> {
        const response = axios.put(`${environment.apiUrl}/guia-de-remessa-itens`, entity);
        return response.then(res => res.data)
            .catch(error => {
                throw new Error(error);
            });
    }
    async delete(id: string): Promise<void> {
        const response = axios.delete(`${environment.apiUrl}/guia-de-remessa-itens/${id}`);
        return response.then(res => res.data)
            .catch(error => {
                throw new Error(error);
            });
    }
    async getPedidosByGuiaDeRemessaId(id: string): Promise<GuiaDeRemessaItem[]> {
        const response = await axios.get(`${environment.apiUrl}/guias-de-remessa-itens/pedidos/${id}`);
        return response.data;
    }

    async getGuiaDeRemessaPdf(id: string): Promise<Blob> {
        try{
            const response = await axios.get(`${environment.apiUrl}/guias-de-remessa-itens/gerar-guia-de-remessa-pdf/${id}`, {responseType: 'blob'});
            return response.data
        }catch (error) {
            console.log("Erro ao buscar guia de remessa pdf: ", error);
            throw error;
        }                
    }
}