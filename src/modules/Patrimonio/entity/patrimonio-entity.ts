import { LocalSolicitacaoItem } from "../enum/patrimonio-enum";

export class Patrimonio {
    public id?: string;
    public descricao?: string;
    public quantidade?: number;
    public local?: LocalSolicitacaoItem;
}