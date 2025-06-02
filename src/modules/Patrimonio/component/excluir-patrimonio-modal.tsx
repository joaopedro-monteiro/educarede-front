import React, { useState } from 'react';
import { Button, Modal, Tooltip } from 'antd';
import { DeleteFilled } from "@ant-design/icons";
import { LocalSolicitacaoItem } from '../enum/patrimonio-enum';
import { PatrimonioService } from '../service/patrimonio-service';
import { toast } from 'react-toastify';

interface ExcluirPatrimonioModalProps {
    id?: string;
    descricao?: string;
    quantidade?: number;
    local?: LocalSolicitacaoItem | string;
    onSaved: () => void;
}

const ExcluirPatrimonioModal: React.FC<ExcluirPatrimonioModalProps> = ({ id, descricao, quantidade, local, onSaved }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        const patrimonioService = new PatrimonioService();
        patrimonioService
            .delete(id!)
            .then(() => {
                toast.success("Patrimônio excluído com sucesso!");
                console.log("Patrimônio excluído com sucesso!");
                onSaved();
            })
            .catch((error) => {
                toast.error("Erro ao excluir Patrimônio!");
                console.log("Erro ao excluir Patrimônio: ", error);
            });


        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Tooltip title="Excluir Patrimônio">
                <DeleteFilled onClick={showModal} style={{ color: "red" }} />
            </Tooltip>
            <Modal
                title="Deseja mesmo excluir este Patrimônio?"
                open={isModalOpen}
                onOk={handleOk}
                okText="Excluir"
                okType="danger"
                onCancel={handleCancel}
                cancelText="Cancelar"
            >
                <p>
                    <strong>Descrição:</strong> {descricao}
                </p>
                <p>
                    <strong>Quantidade:</strong> {quantidade}
                </p>
                <p>
                    <strong>Local:</strong> {local}
                </p>
            </Modal>
        </>
    );
};

export default ExcluirPatrimonioModal;