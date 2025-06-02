export enum NivelPrioridade {
    Urgente  = 1,
    Alta,
    Média,
    Baixa,
    Planejamento
}

export const NivelPrioridadeDescricao = {
    [NivelPrioridade.Urgente]: "Urgente",
    [NivelPrioridade.Alta]: "Alta",
    [NivelPrioridade.Média]: "Média",
    [NivelPrioridade.Baixa]: "Baixa",
    [NivelPrioridade.Planejamento]: "Planejamento"
};

export const NivelPrioridadeTooltip = {
    [NivelPrioridade.Urgente]: "Crítico - requer ação imediata",
    [NivelPrioridade.Alta]: "Importante - resolver o mais breve possível",
    [NivelPrioridade.Média]: "Necessário - resolver em tempo hábil",
    [NivelPrioridade.Baixa]: "Rotina - pode aguardar",
    [NivelPrioridade.Planejamento]: "Melhoria - sem prazo crítico"
}

export const NivelPrioridadeCor = {
    [NivelPrioridade.Urgente]: "red",
    [NivelPrioridade.Alta]: "orange",
    [NivelPrioridade.Média]: "warning",
    [NivelPrioridade.Baixa]: "green",
    [NivelPrioridade.Planejamento]: "cyan"
}