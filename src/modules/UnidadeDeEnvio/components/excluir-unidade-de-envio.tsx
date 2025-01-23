import React, { useState } from "react";
import { Modal, Tooltip } from "antd";
import { DeleteFilled } from "@ant-design/icons";
import { toast } from "react-toastify";
import { UnidadeDeEnvioService } from "../service/unidade-de-envio-service";

interface ExcluirUnidadeDeEnvioProps {
    id?: string;
    unidadeDeEnvio?: string;
    quantidadePorUnidade?: number;
    observacao?: string;
    onSaved: () => void;
}

const ExcluirUnidadeDeMedidaModal: React.FC<ExcluirUnidadeDeEnvioProps> = ({
    id,
    unidadeDeEnvio,
    quantidadePorUnidade,
    observacao,
    onSaved,
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        const unidadeDeEnvioService = new UnidadeDeEnvioService();
        unidadeDeEnvioService
            .delete(id!)
            .then(() => {
                toast.success("Unidade de Envio excluída com sucesso!");
                console.log("Unidade de Envio excluída com sucesso!");
                onSaved();
            })
            .catch((error) => {
                toast.error("Erro ao excluir Unidade de Envio!");
                console.log("Erro ao excluir Unidade de Envio: ", error);
            });

        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Tooltip title="Excluir Unidade de Envio">
                <DeleteFilled onClick={showModal} style={{ color: "red" }} />
            </Tooltip>
            <Modal
                title="Deseja mesmo excluir esta Unidade de Envio?"
                open={isModalOpen}
                onOk={handleOk}
                okText="Excluir"
                okType="danger"
                onCancel={handleCancel}
                cancelText="Cancelar"
            >
                <p>
                    <strong>Unidade de Envio:</strong> {unidadeDeEnvio}
                </p>
                <p>
                    <strong>Quantidade por Unidade:</strong> {quantidadePorUnidade}
                </p>
                <p>
                    <strong>Observação:</strong> {observacao}
                </p>
            </Modal>
        </>
    );
};

export default ExcluirUnidadeDeMedidaModal;
