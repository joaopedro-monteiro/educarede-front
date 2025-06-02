import React, { useEffect, useMemo, useState } from 'react';
import { Button, Col, Input, Row, Space, Table, Tag } from 'antd';
import type { TableProps } from 'antd';
import { SolicitacaoItemEntity } from '../entity/solicitacao-item-entity';
import { Solicitacao } from '../entity/solicitacao-entity';
import { SolicitacaoService } from '../service/solicitacao-service';
import { toast } from 'react-toastify';
import moment from 'moment';
import { TipoSolicitacao, TipoSolicitacaoCor, TipoSolicitacaoDescricao } from '../Enum/tipo-solicitacao';
import { Link } from 'react-router-dom';
import SolicitacoesItemModal from './solicitacoes-item-modal';
import NovaSolicitacaoModal from './nova-solicitacao-modal';
import { NivelPrioridade, NivelPrioridadeCor, NivelPrioridadeDescricao } from '../Enum/nivel-prioridade';

const SolicitacaoPage: React.FC = () => {

    const [solicitacao, setSolicitacao] = useState<Solicitacao[]>([]);
    const [solicitacaoSearched, setSolicitacaoSearched] = useState<string>("");

    const columns: TableProps<Solicitacao>['columns'] = [
        {
            title: 'Tipo da Solicitação',
            dataIndex: 'tipoSolicitacao',
            render: (tipoSolicitacao: TipoSolicitacao) => {
                return <Tag color={TipoSolicitacaoCor[tipoSolicitacao]}>{TipoSolicitacaoDescricao[tipoSolicitacao]}</Tag>
            }
        },
        {
            title: 'Nível de Prioridade',
            dataIndex: 'nivelPrioridade',
            render: (nivelPrioridade: NivelPrioridade) => {                
                var teste = nivelPrioridade;
                return <Tag color={NivelPrioridadeCor[nivelPrioridade]}>{NivelPrioridadeDescricao[nivelPrioridade]}</Tag> 
            }                                                          
        },
        {
            title: 'Escola',
            dataIndex: 'unidadeEscolar',
        },
        {
            title: 'Título da Solicitação',
            dataIndex: 'tituloSolicitacao',
        },
        {
            title: 'Data da Emissão',
            dataIndex: 'dataDaEmissao',
            defaultSortOrder: "descend",
            sorter: (a, b) =>
                moment(a.dataDaEmissao).unix() - moment(b.dataDaEmissao).unix(),
            render: (dataDaEmissao) =>
                moment(dataDaEmissao).format("DD/MM/YYYY HH:mm"),
        },
        {
            title: 'Ações',
            width: "10%",
            dataIndex: "acoes",
            render: (_, record) => (
                <SolicitacoesItemModal />
            ),
        }
    ];
    const solicitacaoFilter = solicitacao.filter((solicitacao) => solicitacao.descricao?.toLowerCase()
        .includes(solicitacaoSearched.toLowerCase())
        || solicitacao.tituloSolicitacao?.toLowerCase().includes(solicitacaoSearched.toLowerCase())
        || solicitacao.tipoSolicitacao?.toString().toLowerCase().includes(solicitacaoSearched.toLowerCase()));

    const data = solicitacaoFilter.map((solicitacao) => ({
        key: solicitacao.id,
        tipoSolicitacao: solicitacao.tipoSolicitacao,
        nivelPrioridade: solicitacao.nivelPrioridade,
        tituloSolicitacao: solicitacao.tituloSolicitacao,
        descricao: solicitacao.descricao,
        unidadeEscolar: solicitacao.unidadeEscolar,
        dataDaEmissao: solicitacao.dataDaEmissao,
    }));

    var solicitacaoService = useMemo(() => new SolicitacaoService(), []);

    var refreshSolicitacao = () => {
        solicitacaoService.getAll().then((solicitacao) => {            
            setSolicitacao(solicitacao);
        })
            .catch((error) => {
                toast.error("Erro ao carregar as solicitações");
            });
    }

    useEffect(() => refreshSolicitacao(), []);

    return (
        <div>
            <Row justify="space-between" align="middle" style={{ marginBottom: "10px" }}>
                <Col span={22} style={{ paddingBottom: "5px" }}>
                    <Input.Search
                        placeholder="Pesquisar"
                        enterButton
                        onChange={(e) => setSolicitacaoSearched(e.target.value)}
                    />
                </Col>
                <Col style={{ paddingBottom: "5px" }}>
                    <NovaSolicitacaoModal onSaved={refreshSolicitacao}/>
                </Col>
            </Row>
            <Table<Solicitacao>
                columns={columns}
                dataSource={data}
                showSorterTooltip={{ target: "sorter-icon" }}
            />
        </div>
    )
}

export default SolicitacaoPage;