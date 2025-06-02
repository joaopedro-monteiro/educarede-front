export enum TipoSolicitacao {
    Manutencao = 1,
    Limpeza,
    Patrimonio
}

export const TipoSolicitacaoDescricao = {
    [TipoSolicitacao.Manutencao]: "Manutenção",
    [TipoSolicitacao.Limpeza]: "Limpeza",
    [TipoSolicitacao.Patrimonio]: "Patrimônio"
};

export const TipoSolicitacaoCor ={
    [TipoSolicitacao.Manutencao]: "red",
    [TipoSolicitacao.Limpeza]: "green",
    [TipoSolicitacao.Patrimonio]: "blue"
}