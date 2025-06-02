import { Patrimonio } from "../../Patrimonio/entity/patrimonio-entity";
import { LocalSolicitacaoItem } from "../../Patrimonio/enum/patrimonio-enum";
import { Solicitacao } from "./solicitacao-entity";

export class SolicitacaoItemEntity {
    public solicitacaoId?: string;
    public solicitacao?: Solicitacao;
    public descricao?: string;
    public patrimonioId?: string;
    public patrimonio?: Patrimonio;
    public quantidade?: number;
    public localSolicitacaoItem?: LocalSolicitacaoItem;
}