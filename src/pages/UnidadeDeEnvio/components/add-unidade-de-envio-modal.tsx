import React, { useState } from "react";
import { Button, Col, Form, Input, Modal, Row } from "antd";
import TextArea from "antd/es/input/TextArea";
import { UnidadeDeEnvioService } from "../service/unidade-de-envio-service";
import { UnidadeDeEnvio } from "../entity/unidade-de-envio";
import { toast } from "react-toastify";

const NovaUnidadeDeEnvioModal: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [unidadeDeEnvio, setUnidadeDeEnvio] = useState<string>("");
  const [quantidadePorUnidade, setQuantidadePorUnidade] = useState<number>();
  const [observacao, setObservacao] = useState<string>();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {

    var unidadeDeEnvioToPost = new UnidadeDeEnvio();
    unidadeDeEnvioToPost.unidadeDeEnvio = unidadeDeEnvio;
    unidadeDeEnvioToPost.quantidadePorUnidade = quantidadePorUnidade;
    unidadeDeEnvioToPost.observacao = observacao;

    const unidadeDeEnvioService = new UnidadeDeEnvioService();
    unidadeDeEnvioService.create(unidadeDeEnvioToPost)
    .then(() => {
        console.log("Unidade de Envio criada com sucesso!");
        toast.success("Unidade de Envio criada com sucesso!");
    })
    .catch((error) => {
        console.log("Erro ao criar Unidade de Envio: ", error);
        toast.error("Erro ao criar Unidade de Envio!");
    });

    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button type="dashed" onClick={showModal} style={{ marginTop: "10px" }}>
        Adicionar Unidade de Envio
      </Button>
      <Modal
        title="Nova Unidade de Envio"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form onFinish={handleOk}>
          <Row gutter={25}>
            <Col>
              <Form.Item>
                <Input type="text" placeholder="Unidade de Envio" value={unidadeDeEnvio} onChange={(e) => setUnidadeDeEnvio(e.target.value)}/>
              </Form.Item>
            </Col>
            <Form.Item>
              <Input type="number" placeholder="Quantidade por Unidade" value={quantidadePorUnidade} onChange={(e) => setQuantidadePorUnidade(Number(e.target.value))}/>
            </Form.Item>
            <Col></Col>
          </Row>

          <Row gutter={25}>
            <Col>
              <Form.Item>
                <TextArea placeholder="Observação (opcional)" value={observacao} onChange={(e) => setObservacao(e.target.value)}/>
              </Form.Item>
            </Col>
            <Col></Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default NovaUnidadeDeEnvioModal;
