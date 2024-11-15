import { GuiaDeRemessaItem } from "../../GuiaDeRemessaItem/entity/guia-de-remessa-item";

export class GuiaDeRemessa {
    public id?: string;
    public unidadeEscolar?: string;
    public dataDaEntrega: Date = new Date();
    public Itens: GuiaDeRemessaItem[] = [];
}