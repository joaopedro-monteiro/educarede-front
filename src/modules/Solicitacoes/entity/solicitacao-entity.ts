import { NivelPrioridade } from "../Enum/nivel-prioridade";
import { TipoSolicitacao } from "../Enum/tipo-solicitacao";
import { SolicitacaoItemEntity } from "./solicitacao-item-entity";

export class Solicitacao {
    public id?: string;
    public tipoSolicitacao?: TipoSolicitacao
    public nivelPrioridade?: NivelPrioridade
    public tituloSolicitacao?: string
    public descricao?: string
    public usuarioId?: string
    public unidadeEscolar?: string
    public itens?: Array<SolicitacaoItemEntity>[]  
    public dataDaEmissao?: Date
    public dataDaEntrega?: Date
    public recusado?: boolean
    public motivoRecusa?: string
    public dataRecusa?: Date      
}