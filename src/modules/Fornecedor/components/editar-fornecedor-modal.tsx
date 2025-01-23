import React, { useEffect, useState } from "react";
import { Form, Input, Modal, Row, Select, Tooltip } from "antd";
import { EditFilled } from "@ant-design/icons";
import { Fornecedor } from "../entity/fornecedor";
import { FornecedorService } from "../service/fornecedor-service";
import { toast } from "react-toastify";

interface EditarProdutoModalProps {
  id?: string;
  nome?: string;
  cnpj?: string;
  telefone?: string;
  email?: string;
  onSaved: () => void;
}

const EditarFornecedorModal: React.FC<EditarProdutoModalProps> = ({
  id,
  nome,
  cnpj,
  telefone,
  email,
  onSaved,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [nomeToPut, setNomeToPut] = useState<string>("");
  const [cnpjToPut, setCnpjToPut] = useState<string>("");
    const [telefoneToPut, setTelefoneToPut] = useState<string>("");
    const [emailToPut, setEmailToPut] = useState<string>("");

  const showModal = () => {
    setNomeToPut(nome || "");
    setCnpjToPut(cnpj || "");
    setTelefoneToPut(telefone || "");
    setEmailToPut(email || "");

    setIsModalOpen(true);
  };

  const handleOk = () => {
    var fornecedorToPut = new Fornecedor();
    fornecedorToPut.id = id;
    fornecedorToPut.nome = nomeToPut;
    fornecedorToPut.cnpj = cnpjToPut;
    fornecedorToPut.telefone = telefoneToPut;
    fornecedorToPut.email = emailToPut;

    console.log("produto editado: ", fornecedorToPut);

    const fornecedorService = new FornecedorService();
    fornecedorService
      .update(fornecedorToPut)
      .then(() => {
        console.log("Fornecedor atualizado com sucesso!");
        toast.success("Fornecedor atualizado com sucesso!");
        onSaved();
      })
      .catch((error) => {
        console.log("Erro ao atualizar Fornecedor: ", error);
        toast.error("Erro ao atualizar Fornecedor!");
      });

    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Tooltip title="Editar Fornecedor">
        <EditFilled onClick={showModal} />
      </Tooltip>

      <Modal
        title="Editar Fornecedor"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form onFinish={handleOk}>
          <Form.Item>
            <Row>
              <Input
                placeholder="Nome"
                value={nomeToPut}
                onChange={(e) => setNomeToPut(e.target.value)}
              />
            </Row>
          </Form.Item>    
          <Form.Item>
            <Row>
              <Input
                placeholder="CNPJ"
                value={cnpjToPut}
                onChange={(e) => setCnpjToPut(e.target.value)}
              />
            </Row>
          </Form.Item>  
          <Form.Item>
            <Row>
              <Input
                placeholder="Telefone"
                value={telefoneToPut}
                onChange={(e) => setTelefoneToPut(e.target.value)}
              />
            </Row>
          </Form.Item>  
          <Form.Item>
            <Row>
              <Input
                placeholder="E-mail"
                value={emailToPut}
                onChange={(e) => setEmailToPut(e.target.value)}
              />
            </Row>
          </Form.Item>        
        </Form>
      </Modal>
    </>
  );
};

export default EditarFornecedorModal;
