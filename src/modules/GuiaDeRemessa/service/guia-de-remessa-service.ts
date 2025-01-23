import axios from 'axios';
import { GuiaDeRemessa } from '../entity/guia-de-remessa';
import { IBaseService } from '../../../infrastructure/services/base-service';
import { environment } from '../../../environments/environment';
import { DataDaEntrega } from '../../Pedidos/command/data-da-entrega';

export class GuiaDeRemessaService implements IBaseService<GuiaDeRemessa> {
    async getAll(): Promise<GuiaDeRemessa[]> {
        const response = await axios.get(`${environment.apiUrl}/guias-de-remessa`);
        return response.data;
    }
    async getById(id: string): Promise<GuiaDeRemessa> {
        const response = axios.get(`${environment.apiUrl}/guias-de-remessa/${id}`);
        return response.then(res => res.data)
            .catch(error => {
                throw new Error(error);
            });
    }
    async create(entity: GuiaDeRemessa): Promise<GuiaDeRemessa> {
        const response = axios.post(`${environment.apiUrl}/guias-de-remessa`, entity);
        return response.then(res => res.data)
            .catch(error => {
                throw new Error(error);
            });
    }
    async update(entity: GuiaDeRemessa): Promise<GuiaDeRemessa> {
        const response = axios.put(`${environment.apiUrl}/guias-de-remessa/${entity.id}`, entity);
        return response.then(res => res.data)
            .catch(error => {
                throw new Error(error);
            });
    }
    async delete(id: string): Promise<void> {
        const response = axios.delete(`${environment.apiUrl}/guias-de-remessa/${id}`);
        return response.then(res => res.data)
            .catch(error => {
                throw new Error(error);
            });
    }
    async alterarDataDaEntrega(entity: DataDaEntrega): Promise<DataDaEntrega> {
        const response = axios.put(`${environment.apiUrl}/guias-de-remessa/data-da-entrega`, entity);
        return response.then(res => res.data)
            .catch(error => {
                throw new Error(error);
            });
    }
}