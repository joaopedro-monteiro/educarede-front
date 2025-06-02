import React, { useState } from 'react';
import { Button, Modal, Tooltip } from 'antd';
import { SearchOutlined } from "@ant-design/icons";

const SolicitacoesItemModal: React.FC = () => {
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
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
        </>
    );
};

export default SolicitacoesItemModal;