import React, { useState } from "react";
import { Form, Input, Modal, Row, Tooltip } from "antd";
import { EditFilled } from "@ant-design/icons";
import { toast } from "react-toastify";
import { UnidadeDeEnvio } from "../entity/unidade-de-envio";
import { UnidadeDeEnvioService } from "../service/unidade-de-envio-service";

interface EditarUnidadeDeEnvioModalProps {
  id?: string;
  unidadeDeEnvio?: string;
  quantidadePorUnidade?: number;
  observacao?: string;
  onSaved: () => void;
}

const EditarUnidadeDeEnvioModal: React.FC<EditarUnidadeDeEnvioModalProps> = ({
  id,
  unidadeDeEnvio,
  quantidadePorUnidade,
  observacao,
  onSaved,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [unidadeDeEnvioNameToPut, setUnidadeDeEnvioToPut] = useState<string>("");
  const [quantidadePorUnidadeToPut, setQuantidadePorUnidadeToPut] = useState<number>(0);
  const [observacaoToPut, setObservacaoToPut] = useState<string>("");

  const showModal = () => {
    setUnidadeDeEnvioToPut(unidadeDeEnvio || "");
    setQuantidadePorUnidadeToPut(quantidadePorUnidade || 0);
    setObservacaoToPut(observacao || "");

    setIsModalOpen(true);
  };

  const handleOk = () => {
    var unidadeDeEnvioToPut = new UnidadeDeEnvio();
    unidadeDeEnvioToPut.id = id;
    unidadeDeEnvioToPut.unidadeDeEnvio = unidadeDeEnvioNameToPut;
    unidadeDeEnvioToPut.quantidadePorUnidade = quantidadePorUnidadeToPut;
    unidadeDeEnvioToPut.observacao = observacaoToPut;

    console.log("unidade de envio editado: ", unidadeDeEnvioToPut);

    const unidadeDeEnvioService = new UnidadeDeEnvioService();
    unidadeDeEnvioService
      .update(unidadeDeEnvioToPut)
      .then(() => {
        console.log("Unidade de Envio atualizada com sucesso!");
        toast.success("Unidade de Envio atualizada com sucesso!");
        onSaved();
      })
      .catch((error) => {
        console.log("Erro ao atualizar Unidade de Envio: ", error);
        toast.error("Erro ao atualizar Unidade de Envio!");
      });

    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Tooltip title="Editar Unidade de Envio">
        <EditFilled onClick={showModal} />
      </Tooltip>

      <Modal
        title="Editar Unidade de Envio"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form onFinish={handleOk}>
          <Form.Item>
            <Row>
              <Input
                placeholder="Unidade de Envio"
                value={unidadeDeEnvioNameToPut}
                onChange={(e) => setUnidadeDeEnvioToPut(e.target.value)}
              />
            </Row>
          </Form.Item>
          <Form.Item>
            <Row>
              <Input
                placeholder="Quantidade por Unidade"
                value={quantidadePorUnidadeToPut}
                onChange={(e) => setQuantidadePorUnidadeToPut(Number(e.target.value))}
              />
            </Row>
          </Form.Item>
          <Form.Item>
            <Row>
              <Input
                placeholder="Observação"
                value={observacaoToPut}
                onChange={(e) => setObservacaoToPut(e.target.value)}
              />
            </Row>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default EditarUnidadeDeEnvioModal;
