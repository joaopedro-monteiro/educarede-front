import React, { useContext, useMemo, useState } from 'react';
import { Button, Col, Form, Input, Modal, Row, Select, Space, Tag, Tooltip } from 'antd';
import { TipoSolicitacao, TipoSolicitacaoDescricao } from '../Enum/tipo-solicitacao';
import { PatrimonioService } from '../../Patrimonio/service/patrimonio-service';
import { Patrimonio } from '../../Patrimonio/entity/patrimonio-entity';
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { SolicitacaoCommand } from '../command/solicitacao-command';
import { SolicitacaoItemCommand } from '../command/solicitacao-item-command';
import { AuthContext } from '../../../infrastructure/context/auth';
import { SolicitacaoService } from '../service/solicitacao-service';
import { toast } from 'react-toastify';
import { NivelPrioridade, NivelPrioridadeCor, NivelPrioridadeDescricao, NivelPrioridadeTooltip } from '../Enum/nivel-prioridade';

interface NovaSolicitacaoModalProps {
    onSaved?: () => void;
}

const NovaSolicitacaoModal: React.FC<NovaSolicitacaoModalProps> = ({ onSaved }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [patrimonios, setPatrimonio] = useState<Patrimonio[]>([]);
    const [patrimonioSelecionado, setPatrimonioSelecionado] = useState<Patrimonio>();
    const [quantidadeDisponivel, setQuantidadeDisponivel] = useState<number>(0);
    const [form] = Form.useForm();

    const [tipoDaSolicitacao, setTipoDaSolicitacao] = useState<TipoSolicitacao>();

    const { user } = useContext(AuthContext);


    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = async (values: any) => {

        var solicitacao = new SolicitacaoCommand();
        solicitacao.tipoSolicitacao = values.tipoSolicitacao;
        solicitacao.nivelPrioridade = values.nivelPrioridade;
        solicitacao.tituloSolicitacao = values.tituloSolicitacao;
        solicitacao.descricao = values.descricao;
        solicitacao.usuarioId = user?.id;
        solicitacao.unidadeEscolar = user?.nomeDaEscola;
        debugger
        if (values.patrimonios !== undefined) {
            const patrimoniosObj = await Promise.all(
                values.patrimonios.map(async (patrimonio: any) => {
                    return await loadPatrimonioById(patrimonio.patrimonioId);
                })
            );

            var solicitacaoItem = new Array<SolicitacaoItemCommand>();
            patrimoniosObj.forEach((patrimonio: Patrimonio) => {
                solicitacaoItem.push({
                    patrimonioId: patrimonio.id,
                    descricao: patrimonio.descricao,
                    quantidade: patrimonio.quantidade,
                    localSolicitacaoItem: patrimonio.local,
                });
            });

            solicitacao.itens = solicitacaoItem;
        }

        var solicitacaoService = new SolicitacaoService();
        solicitacaoService.create(solicitacao)
            .then(() => {
                toast.success("Solicitação criada com sucesso!");
                form.resetFields();
                loadPatrimonio();
                setIsModalOpen(false);
                if (onSaved)
                    onSaved();
            })
            .catch((error) => {
                console.log(error);
                toast.error("Erro ao criar solicitação!");
                setIsModalOpen(false);
            });

        setIsModalOpen(false);
    };

    const handleCancel = () => {
        form.resetFields();
        setIsModalOpen(false);
    };

    var patrimonioService = useMemo(() => new PatrimonioService(), []);

    async function loadPatrimonioById(idPatrimonioSelecionado: string): Promise<Patrimonio> {
        var patrimonio = await patrimonioService.getById(idPatrimonioSelecionado);
        return patrimonio;
    }

    const loadPatrimonio = () => {
        patrimonioService.getAll().then((patrimonio) => {
            setPatrimonio(patrimonio);
        })
            .catch((error) => {
                console.error("Erro ao carregar patrimônio:", error);
            })
    }

    const quantidadeDisponivelPatrimonioSelecionado = (idPatrimonioSelecionado?: string) => {
        patrimonioService.getById(idPatrimonioSelecionado!).then((patrimonio) => {
            setPatrimonioSelecionado(patrimonio);
            setQuantidadeDisponivel(patrimonio.quantidade!);
        })
    }

    return (
        <>
            <Button type="primary" onClick={showModal}>
                Nova Solicitação
            </Button>
            <Modal
                title="Nova Solicitação"
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={isModalOpen}
                onOk={() => form.submit()}
                onCancel={handleCancel}
                okText="Salvar"
                cancelText="Cancelar"
            >
                <Form form={form} name="dynamic_form_nest_item" onFinish={handleOk}>
                    <Row>
                        <Col span={24}>
                            <Form.Item name="tipoSolicitacao" rules={[{ required: true, message: 'Preencha o tipo da solicitação' }]}>
                                <Select placeholder="Tipo da Solicitação" onChange={(value: TipoSolicitacao) => setTipoDaSolicitacao(value)}>
                                    {Object.values(TipoSolicitacao)
                                        .filter(value => typeof value === 'number')
                                        .map((value) => (
                                            <Select.Option key={value} value={value}>
                                                {TipoSolicitacaoDescricao[value as TipoSolicitacao]}
                                            </Select.Option>
                                        ))}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Form.Item name="nivelPrioridade" rules={[{ required: true, message: 'Preencha o nível de prioridade' }]}>
                                <Select placeholder="Nível de Prioridade">
                                    {Object.values(NivelPrioridade).filter(value => typeof value === 'number').map((value) => (
                                        <Select.Option key={value} value={value}>
                                            <Tooltip title={NivelPrioridadeTooltip[value as NivelPrioridade]}>
                                                <Tag color={NivelPrioridadeCor[value as NivelPrioridade]}>{NivelPrioridadeDescricao[value as NivelPrioridade]}</Tag>                                                
                                            </Tooltip>
                                        </Select.Option>
                                    ))}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Form.Item name="tituloSolicitacao" rules={[{ required: true, message: 'Preencha este campo' }]}>
                                <Input type="text" placeholder="Título da Solicitação" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Form.Item name="descricao" rules={[{ required: true, message: 'Preencha este campo' }]}>
                                <Input.TextArea placeholder="Descrição da Solicitação" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row style={{ display: form.getFieldValue('tipoSolicitacao') == TipoSolicitacao.Patrimonio ? 'block' : 'none' }}>
                        <Col span={24}>
                            <Form.List name="patrimonios">
                                {(fields, { add, remove }) => (
                                    <>
                                        {fields.map(({ key, name, ...restField }) => (
                                            <Row gutter={10} key={key}>
                                                <Col span={12}>
                                                    <Form.Item
                                                        {...restField}
                                                        name={[name, 'patrimonioId']}
                                                        rules={[{ required: true, message: 'Selecione um patrimônio' }]}
                                                    >
                                                        <Select onFocus={loadPatrimonio} placeholder="Patrimônio" onSelect={(idPatrimonioSelecionado: string) => quantidadeDisponivelPatrimonioSelecionado(idPatrimonioSelecionado)}>
                                                            {patrimonios.map((item) => (
                                                                <Select.Option key={item.id} value={item.id}>
                                                                    {item.descricao}
                                                                </Select.Option>
                                                            ))}
                                                        </Select>
                                                    </Form.Item>
                                                </Col>
                                                <Col span={11}>
                                                    <Form.Item
                                                        {...restField}
                                                        name={[name, 'quantidade']}
                                                        rules={[{ required: true, message: 'Informe a quantidade' }]}
                                                    >
                                                        <Select placeholder="Quantidade">
                                                            {quantidadeDisponivel > 0 ? (
                                                                [...Array(quantidadeDisponivel)].map((_, index) => (
                                                                    <Select.Option key={index + 1} value={index + 1}>
                                                                        {index + 1}
                                                                    </Select.Option>
                                                                ))
                                                            ) : (
                                                                <Select.Option disabled>
                                                                    Nenhuma quantidade disponível
                                                                </Select.Option>
                                                            )}
                                                        </Select>
                                                    </Form.Item>
                                                </Col>
                                                <MinusCircleOutlined onClick={() => remove(name)} style={{ marginBottom: 23 }} />
                                            </Row>
                                        ))}
                                        <Form.Item>
                                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                                Add Patrimônio
                                            </Button>
                                        </Form.Item>
                                    </>
                                )}
                            </Form.List>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </>
    );
};

export default NovaSolicitacaoModal;