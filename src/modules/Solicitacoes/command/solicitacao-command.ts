import { SolicitacaoItemEntity } from "../entity/solicitacao-item-entity";
import { NivelPrioridade } from "../Enum/nivel-prioridade";
import { TipoSolicitacao } from "../Enum/tipo-solicitacao";
import { SolicitacaoItemCommand } from "./solicitacao-item-command";

export class SolicitacaoCommand {
    public id?: string;
    public tipoSolicitacao?: TipoSolicitacao
    public nivelPrioridade?: NivelPrioridade
    public tituloSolicitacao?: string
    public descricao?: string
    public usuarioId?: string
    public unidadeEscolar?: string
    public itens?: Array<SolicitacaoItemCommand>       
}