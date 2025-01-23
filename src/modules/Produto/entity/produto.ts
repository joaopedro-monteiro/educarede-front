import { Fornecedor } from "../../Fornecedor/entity/fornecedor";
import { UnidadeDeEnvio } from "../../UnidadeDeEnvio/entity/unidade-de-envio";

export class Produto{
    public id?: string;
    public nome?: string;
    public fornecedorId?: string;
    public fornecedor?: Fornecedor = new Fornecedor();
    public quantidadeEmEstoque?: number;
    public unidadeDeEnvioId?: string;
    public unidadeDeEnvio?: UnidadeDeEnvio = new UnidadeDeEnvio();
}