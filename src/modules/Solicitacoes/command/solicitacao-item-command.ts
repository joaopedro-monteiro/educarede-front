import { LocalSolicitacaoItem } from "../../Patrimonio/enum/patrimonio-enum";

export class SolicitacaoItemCommand {
  public id?: string;
  public solicitacaoId?: string;
  public patrimonioId?: string;
  public descricao?: string;
  public quantidade?: number;
  public localSolicitacaoItem?: LocalSolicitacaoItem;
}