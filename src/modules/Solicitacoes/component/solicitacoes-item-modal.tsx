import React, { useEffect, useMemo, useState } from 'react';
import { Button, Modal, Tooltip } from 'antd';
import { SearchOutlined } from "@ant-design/icons";
import { SolicitacaoService } from '../service/solicitacao-service';
import { Solicitacao } from '../entity/solicitacao-entity';
import { toast } from 'react-toastify';
import { TipoSolicitacao } from '../Enum/tipo-solicitacao';
import { SolicitacaoItemEntity } from '../entity/solicitacao-item-entity';
import { NivelPrioridade } from '../Enum/nivel-prioridade';
import moment from 'moment';

interface SolicitacoesItemProps {
    tipoSolicitacao: TipoSolicitacao,
    nivelPrioridade: NivelPrioridade,
    tituloSolicitacao: string,
    descricaoSolicitacao: string,
    unidadeEscolar: string,
    dataEmissao: Date,    
    //itens: SolicitacaoItemEntity[]
}

const SolicitacoesItemModal: React.FC<SolicitacoesItemProps> = ({ tipoSolicitacao, nivelPrioridade, tituloSolicitacao, descricaoSolicitacao, unidadeEscolar, dataEmissao }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);    

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };    

    return (
        <>
            <Tooltip title="Detalhes da Solicitação">
                <Button onClick={showModal}>
                    <SearchOutlined />
                </Button>
            </Tooltip>

            <Modal
                title="Detalhes da Solicitação"
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Salvar"
                cancelText="Cancelar"
            >
                <p><strong>Tipo da solicitação: </strong>{tipoSolicitacao}</p>
                <p><strong>Nível de prioridade: </strong>{nivelPrioridade}</p>
                <p><strong>Unidade Escolar: </strong>{unidadeEscolar}</p>
                <p><strong>Título: </strong>{tituloSolicitacao}</p>
                <p><strong>Descrição: </strong>{descricaoSolicitacao}</p>
                <p><strong>Data de Emissão: </strong>{moment(dataEmissao).format("DD/MM/YYYY HH:mm")}</p>                
            </Modal>
        </>
    );
};

export default SolicitacoesItemModal;