import { GuiaDeRemessa } from "../../GuiaDeRemessa/entity/guia-de-remessa";
import { Produto } from "../../Produto/entity/produto";

export class GuiaDeRemessaItem {
    public id?: string;
    public guiaDeRemessaId?: string;
    public guiaDeRemessa?: GuiaDeRemessa = new GuiaDeRemessa();
    public produtoId?: string;
    public produto?: Produto = new Produto();
    public produtoNome?: string;
    public quantidade: number = 0;
}