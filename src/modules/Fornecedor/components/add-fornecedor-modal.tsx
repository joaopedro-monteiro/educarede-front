import React, { useState } from "react";
import { Button, Col, Form, Input, Modal, Row } from "antd";
import { cnpjMask } from "../../../infrastructure/helpers/cnpj-mask";
import { Fornecedor } from "../entity/fornecedor";
import { FornecedorService } from "../service/fornecedor-service";
import { toast } from "react-toastify";
import TelefoneBrasileiroInput from "../../../infrastructure/helpers/telefone-mask";

interface AdicionarFornecedorModalProps {
  typeButton: "primary" | "dashed";
  onSaved?: () => void;
}

const NovoFornecedorModal: React.FC<AdicionarFornecedorModalProps> = ({typeButton, onSaved}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [nome, setNome] = useState<string>("");
  const [cnpj, setCnpj] = useState<string>("");
  const [telefone, setTelefone] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    var fornecedorToPost = new Fornecedor();
    fornecedorToPost.nome = nome;
    fornecedorToPost.cnpj = cnpj;
    fornecedorToPost.telefone = telefone;
    fornecedorToPost.email = email;

    console.log(fornecedorToPost);

    const fornecedorService = new FornecedorService();

    fornecedorService.create(fornecedorToPost)
      .then(() => {
        console.log("Fornecedor criado com sucesso!");
        toast.success("Fornecedor criado com sucesso!");
        if (onSaved) {
          onSaved();
        }
      })
      .catch((error) => {
        console.log("Erro ao criar Fornecedor: ", error);
        toast.error("Erro ao criar Fornecedor!");
      });

    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button type={typeButton} onClick={showModal}>
        Adicionar Fornecedor
      </Button>
      <Modal
        title="Novo Fornecedor"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form onFinish={handleOk}>
          <Row gutter={25}>
            <Col>
              <Form.Item>
                <Input type="text" placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />
              </Form.Item>
            </Col>
            <Form.Item>
              <Input type="text" placeholder="CNPJ" value={cnpjMask(cnpj)} onChange={(e) => setCnpj(e.target.value)} />
            </Form.Item>
            <Col></Col>
          </Row>

          <Row gutter={25}>
            <Col>
              <Form.Item>
                <TelefoneBrasileiroInput value={telefone} onChange={(e) => setTelefone(e.target.value)} temDDD />
              </Form.Item>
            </Col>
            <Form.Item>
              <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </Form.Item>
            <Col></Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

export default NovoFornecedorModal;
