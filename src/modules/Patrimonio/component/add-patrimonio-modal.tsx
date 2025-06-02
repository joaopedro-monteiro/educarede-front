import React, { useState } from 'react';
import { Button, Col, Input, Modal, Row, Select } from 'antd';
import { Form } from 'antd';
import { LocalSolicitacaoItem } from '../enum/patrimonio-enum';
import { Patrimonio } from '../entity/patrimonio-entity';
import { PatrimonioService } from '../service/patrimonio-service';
import { toast } from 'react-toastify';

interface NovoPatrimonioModalProps {    
    onSaved?: () => void;
}

const NovoPatrimonioModal: React.FC<NovoPatrimonioModalProps> = ({onSaved}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const [descricao, setDescricao] = useState<string>("");
    const [quantidade, setQuantidade] = useState<number>();
    const [local, setLocal] = useState<LocalSolicitacaoItem>();


    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        var patrimonioToPost = new Patrimonio();
        patrimonioToPost.descricao = descricao;
        patrimonioToPost.quantidade = quantidade;
        patrimonioToPost.local = local;

        const patrimonioService = new PatrimonioService();

        patrimonioService.create(patrimonioToPost)
        .then(() => {
            console.log("Patrimônio criado com sucesso!");
            toast.success("Patrimônio criado com sucesso!");
            if(onSaved)
                onSaved();     
            
            setDescricao("");
            setQuantidade(undefined);
            setLocal(undefined);
        })
        .catch((error) => {
            console.log("Erro ao criar Patrimônio: ", error);
            toast.error("Erro ao criar Patrimônio!");
        });

        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <Button type="primary" onClick={showModal}>
                Adicionar Patrimônio
            </Button>
            <Modal title="Adicionar novo Patrimônio" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} cancelText="Cancelar" okText="Salvar">
                <Form onFinish={handleOk}>
                    <Row gutter={25}>
                        <Col>
                            <Form.Item>
                                <Input type="text" placeholder="Descrição do Patrimônio" value={descricao} onChange={(e) => setDescricao(e.target.value)}/>
                            </Form.Item>
                        </Col>
                        <Col>
                            <Form.Item>
                                <Input type="number" placeholder="Quantidade" value={quantidade} onChange={(e) => setQuantidade(Number(e.target.value))}/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={25}>
                        <Col>
                            <Form.Item>
                                <Select
                                    placeholder="Selecione o Local"
                                    value={local}
                                    onChange={(value) => setLocal(value)}
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

export default NovoPatrimonioModal;