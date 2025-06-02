import React, { useState } from 'react';
import { EditFilled } from "@ant-design/icons";
import { Button, Col, Form, Input, Modal, Row, Select, Tooltip } from 'antd';
import { LocalSolicitacaoItem } from '../enum/patrimonio-enum';
import { Patrimonio } from '../entity/patrimonio-entity';
import { PatrimonioService } from '../service/patrimonio-service';
import { toast } from 'react-toastify';

interface EditarPatrimonioModalProps {
    id?: string;
    descricao?: string;
    quantidade?: number;
    local?: LocalSolicitacaoItem | string;
    onSaved?: () => void;
}

const EditarPatrimonioModal: React.FC<EditarPatrimonioModalProps> = ({ id, descricao, quantidade, local, onSaved }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [descricaoToPut, setDescricaoToPut] = useState<string>("");    
    const [localToPut, setLocalToPut] = useState<LocalSolicitacaoItem>();

    const showModal = () => {
        setDescricaoToPut(descricao || "");        
        setLocalToPut(local as LocalSolicitacaoItem || undefined);
        setIsModalOpen(true);
    };

    const handleOk = () => {
        var patrimonioToPut = new Patrimonio();
        patrimonioToPut.id = id;
        patrimonioToPut.descricao = descricaoToPut;
        patrimonioToPut.quantidade = quantidade;
        patrimonioToPut.local = localToPut;

        const patrimonioService = new PatrimonioService();
        
        patrimonioService.update(patrimonioToPut)
        .then(() => {
            console.log("Patrimônio atualizado com sucesso!");
            if(onSaved)
                onSaved();     
            toast.success("Patrimônio atualizado com sucesso!");
            setDescricaoToPut("");            
            setLocalToPut(undefined);
        })
        .catch((error) => {
            console.log("Erro ao atualizar Patrimônio: ", error);
            toast.error("Erro ao atualizar Patrimônio!");
        });

        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Tooltip title="Editar Patrimônio">
                <EditFilled onClick={showModal} />
            </Tooltip>
            <Modal title="Editar Patrimônio" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} cancelText="Cancelar" okText="Salvar">
                <Form onFinish={handleOk}>
                    <Row gutter={25}>
                        <Col>
                            <Form.Item>
                                <Input type="text" placeholder="Descrição do Patrimônio" value={descricaoToPut} onChange={(e) => setDescricaoToPut(e.target.value)} />
                            </Form.Item>
                        </Col>   
                        <Col style={{ width: "50%" }}>
                            <Form.Item>
                                <Select
                                    placeholder="Selecione o Local"
                                    value={localToPut}
                                    onChange={(value) => setLocalToPut(value)}
                                    options={[
                                        { value: LocalSolicitacaoItem.CAIC, label: 'CAIC' },
                                        { value: LocalSolicitacaoItem.PorãoDoCoronelPraxedes, label: 'Porão do Coronel Praxedes' },
                                        { value: LocalSolicitacaoItem.SecretariaDeEducacao, label: 'Secretaria de Educação' },
                                    ]}
                                />
                            </Form.Item>
                        </Col>                     
                    </Row>                    
                </Form>
            </Modal>
        </>
    );
};

export default EditarPatrimonioModal;