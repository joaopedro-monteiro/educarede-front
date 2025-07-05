import axios from "axios";
import { environment } from "../../../environments/environment";
import { Solicitacao } from "../entity/solicitacao-entity";
import { SolicitacaoCommand } from "../command/solicitacao-command";

const instance = axios.create({
    baseURL: environment.apiUrl,
    withCredentials: true,
});

export class SolicitacaoService {
    async getAll(): Promise<Solicitacao[]> {
        const response = await instance.get(`solicitacao`).then((res) => {
            return res.data;
        })
            .catch((error) => {
                console.log(error);
                throw new Error(error);
            });
        return response;
    }
    async getById(id: string): Promise<Solicitacao> {
        debugger
        const response = await instance.get(`solicitacao/${id}`).then((res) => {
            return res.data;
        })
            .catch((error) => {
                console.log(error);
                throw new Error(error);
            });
        return response;
    }
    async create(entity: SolicitacaoCommand): Promise<Solicitacao> {
        const response = await instance.post(`solicitacao`, entity).then((res) => {
            return res.data;
        })
            .catch((error) => {
                console.log(error);
                throw new Error(error);
            });
        return response;
    }
    async update(entity: Solicitacao): Promise<Solicitacao> {
        const response = await instance.put(`solicitacao`, entity).then((res) => {
            return res.data;
        })
            .catch((error) => {
                console.log(error);
                throw new Error(error);
            });
        return response;
    }
    async delete(id: string): Promise<void> {
        const response = await instance.delete(`solicitacao/${id}`).then((res) => {
            return res.data;
        })
            .catch((error) => {
                console.log(error);
                throw new Error(error);
            });
        return response;
    }
}