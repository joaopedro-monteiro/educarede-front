import axios from "axios";
import { GuiaDeRemessa } from "../entity/guia-de-remessa";
import { IBaseService } from "../../../infrastructure/services/base-service";
import { environment } from "../../../environments/environment";
import { DataDaEntrega } from "../../Pedidos/command/data-da-entrega";

const instance = axios.create({
  baseURL: environment.apiUrl,
  withCredentials: true,
});

export class GuiaDeRemessaService {
  async getAll(role: string, id: string): Promise<GuiaDeRemessa[]> {
    try {
      const response = await instance.get(
        `guias-de-remessa`,
        {
          params: {
            role: role,
            id: id,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar Guias de Remessa:", error);
      throw error;
    }
  }
  async getById(id: string): Promise<GuiaDeRemessa> {
    const response = instance.get(`guias-de-remessa/${id}`);
    return response
      .then((res) => res.data)
      .catch((error) => {
        throw new Error(error);
      });
  }
  async create(entity: GuiaDeRemessa): Promise<GuiaDeRemessa> {
    const response = instance.post(
      `guias-de-remessa`,
      entity
    );
    return response
      .then((res) => res.data)
      .catch((error) => {
        throw new Error(error);
      });
  }
  async update(entity: GuiaDeRemessa): Promise<GuiaDeRemessa> {
    const response = instance.put(
      `guias-de-remessa/${entity.id}`,
      entity
    );
    return response
      .then((res) => res.data)
      .catch((error) => {
        throw new Error(error);
      });
  }
  async delete(id: string): Promise<void> {
    const response = instance.delete(
      `guias-de-remessa/${id}`
    );
    return response
      .then((res) => res.data)
      .catch((error) => {
        throw new Error(error);
      });
  }
  async alterarDataDaEntrega(entity: DataDaEntrega): Promise<DataDaEntrega> {
    const response = instance.put(
      `guias-de-remessa/data-da-entrega`,
      entity
    );
    return response
      .then((res) => res.data)
      .catch((error) => {
        throw new Error(error);
      });
  }

  async recusarPedido(id: string, motivoRecusa: string): Promise<void> {
    const response = await instance.put(`guias-de-remessa/${id}/recusar-pedido`, null, {
      params: {
        motivoRecusa: motivoRecusa,
      },
    });
    return response.data;
  }
}
