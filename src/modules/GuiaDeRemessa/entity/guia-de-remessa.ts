import { GuiaDeRemessaItem } from "../../GuiaDeRemessaItem/entity/guia-de-remessa-item";

export class GuiaDeRemessa {
    public id?: string;
    public idUsuario?: string;
    public unidadeEscolar?: string;
    public dataDaEmissao: Date = new Date();
    public dataDaEntrega: Date = new Date();
    public recusado: boolean = false;
    public motivoRecusa?: string;
    public dataRecusa?: Date;
    public Itens: GuiaDeRemessaItem[] = [];
}